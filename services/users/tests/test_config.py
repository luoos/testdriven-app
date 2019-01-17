import os
import unittest

from flask import current_app

from app import create_app


class TestDevelopmentConfig(unittest.TestCase):
    def setUp(self):
        self.app = create_app('development')
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_app_is_development(self):
        self.assertEqual('Dont fool me, I am smart', self.app.config['SECRET_KEY'])
        self.assertFalse(current_app is None)
        self.assertEqual(
            os.environ.get('DATABASE_DEV_URL'),
            self.app.config['SQLALCHEMY_DATABASE_URI']
        )


class TestTestingConfig(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_app_is_testing(self):
        self.assertEqual('Dont fool me, I am smart', self.app.config['SECRET_KEY'])
        self.assertTrue(self.app.config['TESTING'])
        self.assertFalse(self.app.config['PRESERVE_CONTEXT_ON_EXCEPTION'])
        self.assertEqual(
            os.environ.get('DATABASE_TEST_URL'),
            self.app.config['SQLALCHEMY_DATABASE_URI']
        )


class TestProductionConfig(unittest.TestCase):
    def setUp(self):
        self.app = create_app('production')
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_app_is_production(self):
        self.assertEqual('Dont fool me, I am smart', self.app.config['SECRET_KEY'])
        self.assertFalse(self.app.config['TESTING'])
        self.assertFalse(self.app.config['DEBUG'])


if __name__ == '__main__':
    unittest.main()