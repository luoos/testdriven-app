import json
from flask import current_app

from tests.base import BaseTestCase
from app.models import Post
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

    def test_get_one_post(self):
        fake.posts(1)
        post = Post.query.get(1)
        self.assertTrue(post)
        response = self.client.get(f'api/v1/post/{post.id}')
        self.assertEqual(200, response.status_code)
        data = json.loads(response.data.decode())
        self.assertEqual(post.id, data['data']['id'])
        self.assertEqual(post.title, data['data']['title'])
        self.assertEqual(post.content, data['data']['content'])
        self.assertEqual(
            post.created_time.timestamp(),
            data['data']['created_time'])
        self.assertEqual(
            post.last_updated_time.timestamp(),
            data['data']['last_updated_time'])

    def test_get_post_404(self):
        fake.posts(1)
        post = Post.query.get(1)
        self.assertTrue(post)
        post = Post.query.get(2)
        self.assertFalse(post)
        response = self.client.get(f'api/v1/post/1')
        self.assertEqual(200, response.status_code)
        response = self.client.get(f'api/v1/post/2')
        self.assertEqual(404, response.status_code)
