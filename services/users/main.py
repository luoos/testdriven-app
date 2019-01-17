import os

from app import create_app, db

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

@app.cli.command()
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()