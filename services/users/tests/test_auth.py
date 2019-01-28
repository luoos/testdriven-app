import json

from flask import current_app
from tests.base import BaseTestCase
from tests.utils import add_user


class TestAuthBlueprint(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.client = self.app.test_client()

    def test_user_registration(self):
        response = self.client.post(
            'api/v1/auth/register',
            data=json.dumps({
                'username': 'testname',
                'email': 'test@doe.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual('success', data['status'])
        self.assertEqual('Successfully registered.', data['message'])
        self.assertTrue(data['auth_token'])
        self.assertEqual('application/json', response.content_type)
        self.assertEqual(201, response.status_code)

    def test_user_registration_duplicate_email(self):
        add_user('test', 'test@doe.com', 'password')
        response = self.client.post(
            'api/v1/auth/register',
            data=json.dumps({
                'username': 'john',
                'email': 'test@doe.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(400, response.status_code)
        self.assertIn(
            'Sorry. That user already exists.', data['message'])
        self.assertIn('fail', data['status'])

    def test_user_registration_duplicate_username(self):
        add_user('test', 'test@doe.com', 'password')
        response = self.client.post(
            'api/v1/auth/register',
            data=json.dumps({
                'username': 'test',
                'email': 'test22@doe.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(400, response.status_code)
        self.assertIn(
            'Sorry. That user already exists.', data['message'])
        self.assertIn('fail', data['status'])

    def test_user_registration_invalid_json(self):
        response = self.client.post(
            'api/v1/auth/register',
            data=json.dumps({}),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(400, response.status_code)
        self.assertIn(
            'Invalid payload', data['message'])
        self.assertIn('fail', data['status'])

    def test_user_registration_invalid_json_keys_no_username(self):
        response = self.client.post(
            'api/v1/auth/register',
            data=json.dumps({
                'email': 'test22@doe.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(400, response.status_code)
        self.assertIn(
            'Invalid payload', data['message'])
        self.assertIn('fail', data['status'])

    def test_user_registration_invalid_json_keys_no_email(self):
        response = self.client.post(
            'api/v1/auth/register',
            data=json.dumps({
                'username': 'testname',
                'password': 'password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(400, response.status_code)
        self.assertIn(
            'Invalid payload', data['message'])
        self.assertIn('fail', data['status'])

    def test_user_registration_invalid_json_keys_no_password(self):
        response = self.client.post(
            'api/v1/auth/register',
            data=json.dumps({
                'username': 'testname',
                'email': 'test@doe.com',
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(400, response.status_code)
        self.assertIn(
            'Invalid payload', data['message'])
        self.assertIn('fail', data['status'])

    def test_registered_user_login(self):
        add_user('test', 'test@test.com', 'password')
        response = self.client.post(
            'api/v1/auth/login',
            data=json.dumps({
                'email': 'test@test.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(200, response.status_code)
        self.assertEqual('success', data['status'])
        self.assertEqual('Successfully logged in.', data['message'])
        self.assertTrue(data['auth_token'])
        self.assertEqual('application/json', response.content_type)

    def test_not_registered_user_login(self):
        response = self.client.post(
            'api/v1/auth/login',
            data=json.dumps({
                'email': 'test@test.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertEqual(404, response.status_code)
        self.assertEqual('fail', data['status'])
        self.assertEqual(
            'User does not exist or wrong password.',
            data['message']
        )
        self.assertEqual('application/json', response.content_type)

    def test_valid_logout(self):
        add_user('test', 'test@test.com', 'password')
        resp_login = self.client.post(
            'api/v1/auth/login',
            data=json.dumps({
                'email': 'test@test.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        # valid token logout
        token = json.loads(resp_login.data.decode())['auth_token']
        response = self.client.get(
            'api/v1/auth/logout',
            headers={'Authorization': f'Bearer {token}'}
        )
        data = json.loads(response.data.decode())
        self.assertEqual('success', data['status'])
        self.assertEqual('Successfully logged out.', data['message'])
        self.assertEqual(200, response.status_code)

    def test_invalid_logout_expired_token(self):
        add_user('test', 'test@test.com', 'password')
        current_app.config['TOKEN_EXPIRATION_SECONDS'] = -1
        resp_login = self.client.post(
            'api/v1/auth/login',
            data=json.dumps({
                'email': 'test@test.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        token = json.loads(resp_login.data.decode())['auth_token']
        response = self.client.get(
            'api/v1/auth/logout',
            headers={'Authorization': f'Bearer {token}'}
        )
        data = json.loads(response.data.decode())
        self.assertEqual('fail', data['status'])
        self.assertEqual(
            'Signature expired. Please log in again.',
            data['message'])
        self.assertEqual(401, response.status_code)

    def test_invalid_logout(self):
        response = self.client.get(
            'api/v1/auth/logout',
            headers={'Authorization': 'Bearer invalid'})
        data = json.loads(response.data.decode())
        self.assertEqual('fail', data['status'])
        self.assertEqual(
            'Invalid token. Please log in again.',
            data['message'])
        self.assertEqual(401, response.status_code)

    def test_user_status(self):
        add_user('test', 'test@test.com', 'password')
        resp_login = self.client.post(
            'api/v1/auth/login',
            data=json.dumps({
                'email': 'test@test.com',
                'password': 'password'
            }),
            content_type='application/json'
        )
        token = json.loads(resp_login.data.decode())['auth_token']
        response = self.client.get(
            'api/v1/auth/status',
            headers={'Authorization': f'Bearer {token}'}
        )
        data = json.loads(response.data.decode())
        self.assertEqual('success', data['status'])
        self.assertIsNotNone(data['data'])
        self.assertEqual('test', data['data']['username'])
        self.assertEqual('test@test.com', data['data']['email'])
        self.assertTrue(data['data']['active'])
        self.assertEqual(200, response.status_code)

    def test_invalid_status(self):
        response = self.client.get(
            'api/v1/auth/status',
            headers={'Authorization': 'Bearer invalid'}
        )
        data = json.loads(response.data.decode())
        self.assertEqual('fail', data['status'])
        self.assertEqual(
            'Invalid token. Please log in again.',
            data['message']
        )
        self.assertEqual(401, response.status_code)
