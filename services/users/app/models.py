import jwt
from datetime import datetime, timedelta
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash

from . import db


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(128), nullable=False)
    content = db.Column(db.Text)
    created_time = db.Column(db.DateTime(), default=datetime.utcnow)
    last_updated_time = db.Column(db.DateTime(), default=datetime.utcnow)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_time': self.created_time.timestamp(),
            'last_updated_time': self.last_updated_time.timestamp()
        }


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    created_date = db.Column(db.DateTime(), default=datetime.utcnow,
                             nullable=False)
    posts = db.relationship('Post', backref='author', lazy='dynamic',
                            foreign_keys=[Post.author_id])

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        if not password:
            raise ValueError('Password must be non-empty')
        self.password_hash = generate_password_hash(password)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def encode_auth_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(
                days=current_app.config.get('TOKEN_EXPIRATION_DAYS'),
                seconds=current_app.config.get('TOKEN_EXPIRATION_SECONDS')
            ),
            'iat': datetime.utcnow(),
            'sub': self.id
        }
        exp = payload['exp'].timestamp()
        token = jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
        return token, exp

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(
                auth_token, current_app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'active': self.active
        }
