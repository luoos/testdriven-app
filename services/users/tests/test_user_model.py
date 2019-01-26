from sqlalchemy.exc import IntegrityError

from app import db
from app.models import User
from tests.base import BaseTestCase
from tests.utils import add_user


class TestUserModel(BaseTestCase):

    def test_add_user(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com')
        db.session.add(user)
        db.session.commit()
        self.assertTrue(user.id)
        user = User.query.get(user.id)
        self.assertEqual('JohnDoe', user.username)
        self.assertEqual('greatjohn@doe.com', user.email)
        self.assertTrue(user.active)

    def test_add_user_duplicate_username(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com')
        db.session.add(user)
        db.session.commit()
        duplicate_user = User(
            username='JohnDoe',
            email='greatjohn2@doe2.com'
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_add_user_duplucate_email(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com')
        db.session.add(user)
        db.session.commit()
        duplicate_user = User(
            username='JohnDifferent',
            email='greatjohn@doe.com'
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_to_json(self):
        user = add_user('JohnDoe', 'greatjohn@doe.com')
        db.session.add(user)
        db.session.commit()
        self.assertTrue(isinstance(user.to_json(), dict))
