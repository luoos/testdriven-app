import json
import unittest

from tests.base import BaseTestCase


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


if __name__ == '__main__':
    unittest.main()