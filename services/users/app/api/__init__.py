from flask import Blueprint

api = Blueprint('api', __name__)

from . import users  # noqa: ignore=E402,F401
