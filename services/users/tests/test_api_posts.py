import json
from flask import current_app

from tests.base import BaseTestCase
import app.fake as fake


class TestPostAPI(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.client = self.app.test_client()

    def test_get_posts(self):
        fake.posts()
        response = self.client.get('api/v1/posts')
        data = json.loads(response.data.decode())
        self.assertEqual(200, response.status_code)
        self.assertTrue(data['data']['next'])
        self.assertFalse(data['data']['prev'])
        self.assertEqual(current_app.config['POSTS_PER_PAGE'],
                         len(data['data']['posts']))
