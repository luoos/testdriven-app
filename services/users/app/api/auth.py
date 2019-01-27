from flask import jsonify, request
from sqlalchemy import exc, or_

from . import api
from app import db
from app.models import User


@api.route('/auth/register', methods=['POST'])
def register_user():
    post_data = request.get_json()
    response_object = {
        'status': 'fail',
        'message': 'Invalid payload.'
    }
    if not post_data:
        return jsonify(response_object), 400
    username = post_data.get('username')
    email = post_data.get('email')
    password = post_data.get('password')
    try:
        # check for existing user
        user = User.query.filter(
            or_(User.username == username, User.email == email)).first()
        if not user:
            new_user = User(
                username=username,
                email=email,
                password=password
            )
            db.session.add(new_user)
            db.session.commit()
            # generate auth token
            auth_token = new_user.encode_auth_token()
            response_object['status'] = 'success'
            response_object['message'] = 'Successfully registered.'
            response_object['auth_token'] = auth_token.decode()
            return jsonify(response_object), 201
        else:
            response_object['message'] = 'Sorry. That user already exists.'
            return jsonify(response_object), 400
    except (exc.IntegrityError, ValueError):
        db.session.rollback()
        return jsonify(response_object), 400


@api.route('/auth/login', methods=['POST'])
def login_user():
    post_data = request.get_json()
    response_object = {
        'status': 'fail',
        'message': 'Invalid payload.'
    }
    if not post_data:
        return jsonify(response_object), 400
    email = post_data.get('email')
    password = post_data.get('password')
    try:
        user = User.query.filter_by(email=email).first()
        if user and user.verify_password(password):
            auth_token = user.encode_auth_token()
            if auth_token:
                response_object['status'] = 'success'
                response_object['message'] = 'Successfully logged in.'
                response_object['auth_token'] = auth_token.decode()
                return jsonify(response_object), 200
            else:
                # TODO: raise error
                pass
        else:
            response_object['message'] = \
                'User does not exist or wrong password.'
            return jsonify(response_object), 404
    except Exception:
        response_object['message'] = 'Try again.'
        return jsonify(response_object), 500
