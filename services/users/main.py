import os

from app import create_app, db

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

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
        return 0
    return 1