import json
import unittest

from tests.base import BaseTestCase
from app import db
from app.models import User


def add_user(username, email):
    user = User(username=username, email=email)
    db.session.add(user)
    db.session.commit()
    return user


class TestUserService(BaseTestCase):
    """Tests for the Users Service"""
    def setUp(self):
        super().setUp()
        self.client = self.app.test_client()

    def test_users(self):
        response = self.client.get('/users/ping')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn('pong!', data['message'])
        self.assertIn('success', data['status'])

    def test_add_user(self):
        """Ensure a new user can be added to the database"""
        response = self.client.post(
            'api/v1/user',
            data=json.dumps({
                'username': 'John Doe',
                'email': 'greatjohn@doe.com'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(201, response.status_code)
        self.assertIn('greatjohn@doe.com was added', data['message'])
        self.assertIn('success', data['status'])

    def test_add_user_invalid_json(self):
        """Ensure error is thrown if the JSON object is empty"""
        response = self.client.post(
            'api/v1/user',
            data=json.dumps({}),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 400)
        self.assertIn('Invalid payload', data['message'])
        self.assertIn('fail', data['status'])

    def test_add_user_invalid_json_keys(self):
        """
        Ensure error is thrown if the JSON object
        does not have a username or an email key
        """
        response = self.client.post(
            'api/v1/user',
            data=json.dumps({'email': 'greatjohn@doe.com'}),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 400)
        self.assertIn('Invalid payload', data['message'])
        self.assertIn('fail', data['status'])

        response = self.client.post(
            'api/v1/user',
            data=json.dumps({'username': 'John Doe'}),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 400)
        self.assertIn('Invalid payload', data['message'])
        self.assertIn('fail', data['status'])

    def test_add_user_duplicate_email(self):
        """Ensure error is thrown if the email already exist"""
        self.client.post(
            'api/v1/user',
            data=json.dumps({
                'username': 'John Doe',
                'email': 'greatjohn@doe.com'
            }),
            content_type='application/json'
        )
        response = self.client.post(
            'api/v1/user',
            data=json.dumps({
                'username': 'John Doe',
                'email': 'greatjohn@doe.com'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 400)
        self.assertIn(
            'Sorry, That email already exists', data['message'])
        self.assertIn('fail', data['status'])

    def test_single_user(self):
        """Ensure get single user behaves correctly"""
        user = add_user('John Doe', 'greatjohn@doe.com')
        response = self.client.get(f'api/v1/user/{user.id}')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn('John Doe', data['data']['username'])
        self.assertIn('greatjohn@doe.com', data['data']['email'])
        self.assertIn('success', data['status'])

    def test_single_user_no_id(self):
        """Ensure error is thrown if an id is not provided"""
        response = self.client.get('api/v1/user/foo')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 404)
        self.assertIn('User does not exist', data['message'])
        self.assertIn('fail', data['status'])

    def test_single_user_incorrect_id(self):
        """Ensure error is thrown if the id does not exist"""
        response = self.client.get('api/v1/user/999')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 404)
        self.assertIn('User does not exist', data['message'])
        self.assertIn('fail', data['status'])

    def test_all_users(self):
        """Ensure get all users behaves correctly"""
        add_user('John Doe', 'greatjohn@doe.com')
        add_user('John Snow', 'greatjohn@snow.com')
        response = self.client.get('api/v1/users')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(2, data['data']['total'])
        self.assertIsNone(data['data']['prev'])
        self.assertIsNone(data['data']['next'])
        self.assertEqual('John Doe', data['data']['users'][0]['username'])
        self.assertEqual('greatjohn@doe.com',
                         data['data']['users'][0]['email'])
        self.assertEqual('John Snow', data['data']['users'][1]['username'])
        self.assertEqual('greatjohn@snow.com',
                         data['data']['users'][1]['email'])

    def test_main_no_users(self):
        """Ensure the main route behaves correctly when
        no users have been added to the database"""
        response = self.client.get('/')
        self.assertEqual(200, response.status_code)
        self.assertIn(b'All Users', response.data)
        self.assertIn(b'<p>No Users!</p>', response.data)

    def test_main_some_users(self):
        add_user('John Doe', 'greatjohn@doe.com')
        add_user('John Snow', 'greatjohn@snow.com')
        response = self.client.get('/')
        self.assertEqual(200, response.status_code)
        self.assertIn(b'John Doe', response.data)
        self.assertIn(b'John Snow', response.data)
        self.assertNotIn(b'<p>No Users!</p>', response.data)


if __name__ == '__main__':
    unittest.main()
