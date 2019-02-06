from functools import wraps

from flask import request, jsonify

from app.models import User


def authenticate(f):
    @wraps(f)
    def wrapped_f(*args, **kwargs):
        response_object = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify(response_object), 403
        auth_token = auth_header.split(" ")[1]
        resp_or_id = User.decode_auth_token(auth_token)
        if isinstance(resp_or_id, str):
            response_object['message'] = resp_or_id
            return jsonify(response_object), 401
        user = User.query.filter_by(id=resp_or_id).first()
        if not user or not user.active:
            return jsonify(response_object), 401
        return f(resp_or_id, *args, **kwargs)
    return wrapped_f
