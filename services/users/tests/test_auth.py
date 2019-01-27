import json

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
