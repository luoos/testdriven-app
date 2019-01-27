from sqlalchemy.exc import IntegrityError

from app import db
from app.models import User
from tests.base import BaseTestCase
from tests.utils import add_user


class TestUserModel(BaseTestCase):

    def test_add_user(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com', 'password')
        self.assertTrue(user.id)
        user = User.query.get(user.id)
        self.assertEqual('JohnDoe', user.username)
        self.assertEqual('greatjohn@doe.com', user.email)
        self.assertTrue(user.active)
        self.assertTrue(user.password_hash)

    def test_add_user_duplicate_username(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com', 'password')
        db.session.add(user)
        db.session.commit()
        duplicate_user = User(
            username='JohnDoe',
            email='greatjohn2@doe2.com',
            password='password'
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_add_user_duplucate_email(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com', 'password')
        db.session.add(user)
        db.session.commit()
        duplicate_user = User(
            username='JohnDifferent',
            email='greatjohn@doe.com',
            password='password'
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_to_json(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com', 'password')
        db.session.add(user)
        db.session.commit()
        self.assertTrue(isinstance(user.to_json(), dict))

    def test_passwords_are_random(self):
        user_one = add_user('testname1', 'test1@test.com', 'samepassword')
        user_two = add_user('testname2', 'test2@test.com', 'samepassword')
        self.assertNotEqual(user_one.password_hash, user_two.password_hash)

    def test_encode_auth_token(self):
        user = add_user('testuser', 'test@test.com', 'password')
        auth_token = user.encode_auth_token()
        self.assertTrue(isinstance(auth_token, bytes))

    def test_decode_auth_token(self):
        user = add_user('testuser', 'test@test.com', 'password')
        auth_token = user.encode_auth_token()
        self.assertEqual(user.id, User.decode_auth_token(auth_token))
