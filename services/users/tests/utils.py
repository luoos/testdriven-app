from app import db
from app.models import User, Post
from faker import Faker


fake = Faker()


def add_user(username, email, password):
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user


def add_post(title=None, content=None):
    title, content = title or fake.sentence(), content or fake.text()
    post = Post(title=title, content=content)
    db.session.add(post)
    db.session.commit()
    return post
