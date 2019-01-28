import os

COV = None
if os.environ.get('FLASK_COVERAGE'):
    import coverage
    COV = coverage.coverage(
        branch=True,
        include='app/*'
    )
    COV.start()

import sys  # noqa: ignore=E402
import click  # noqa: ignore=E402
from flask_migrate import upgrade
from app import create_app, db  # noqa: ignore=E402
from app.models import User  # noqa: ignore=E402

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
@click.option('--coverage/--no-coverage', default=False,
              help='Run tests under code coverage.')
def test(coverage):
    """Run the unit test"""
    if coverage and not os.environ.get('FLASK_COVERAGE'):
        import subprocess
        os.environ['FLASK_COVERAGE'] = '1'
        sys.exit(subprocess.call(sys.argv))

    import unittest
    tests = unittest.TestLoader().discover('tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if COV:
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
    if result.wasSuccessful():
        return 0
    else:
        return 1


@app.cli.command()
def seed_db():
    """Seeds the database"""
    db.session.add(User(
        username='johndoe',
        email='greatjohn@doe.com',
        password='password'
    ))
    db.session.add(User(
        username='John Snow',
        email='greatjohn@snow.com',
        password='password'
    ))
    db.session.commit()

@app.cli.command()
def deploy():
    """Run deployment tasks"""
    # migrate database to latest revision
    upgrade()
