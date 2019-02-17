from tests.base import BaseTestCase
from tests.utils import add_post


class TestPostModel(BaseTestCase):

    def test_add_post(self):
        post = add_post()
        self.assertTrue(post.id)
        self.assertTrue(post.title)
        self.assertTrue(post.content)
        self.assertTrue(post.created_time)
        self.assertTrue(post.last_updated_time)
        self.assertFalse(post.author_id)
