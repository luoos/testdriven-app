from flask import Blueprint

api = Blueprint('api', __name__)

from . import users, auth, posts  # noqa: ignore=E402,F401
