import os
import coverage

from app import create_app, db
from app.models import User

COV = coverage.coverage(
    branch=True,
    include='app/*'
)
COV.start()

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

@app.shell_context_processor
def ctx():
    return {'app': app, 'db': db}

@app.cli.command()
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@app.cli.command()
def test():
    import unittest
    tests = unittest.TestLoader().discover('tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1

@app.cli.command()
def seed_db():
    """Seeds the database"""
    db.session.add(User(username='John Doe', email='greatjohn@doe.com'))
    db.session.add(User(username='John Snow', email='greatjohn@snow.com'))
    db.session.commit()