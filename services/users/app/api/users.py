from flask import jsonify, request, current_app, url_for
from sqlalchemy import exc

from . import api
from app import db
from app.models import User


@api.route('/users/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })


@api.route('/user', methods=['POST'])
def add_user():
    post_data = request.get_json()
    response_object = {
        'status': 'fail',
        'message': 'Invalid payload'
    }
    if not post_data:
        return jsonify(response_object), 400
    username = post_data.get('username')
    email = post_data.get('email')
    password = post_data.get('password')
    try:
        user = User.query.filter_by(email=email).first()
        if not user:
            db.session.add(User(
                username=username, email=email, password=password))
            db.session.commit()
            response_object['status'] = 'success'
            response_object['message'] = f'{email} was added'
            return jsonify(response_object), 201
        else:
            response_object['message'] = 'Sorry, That email already exists'
            return jsonify(response_object), 400
    except (exc.IntegrityError, ValueError):
        db.session.rollback()
        return jsonify(response_object), 400


@api.route('/user/<user_id>', methods=['GET'])
def get_single_user(user_id):
    """Get single user details"""
    response_object = {
        'status': 'fail',
        'message': 'User does not exist'
    }
    try:
        user = User.query.get(int(user_id))
        if not user:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'data': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'active': user.active
                }
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@api.route('/users', methods=['GET'])
def get_all_users():
    """Get all users"""
    page = request.args.get('page', 1, type=int)
    pagination = User.query.paginate(
        page,
        per_page=current_app.config['USERS_PER_PAGE'],
        error_out=False
    )
    users = pagination.items
    prev, next = None, None
    if pagination.has_prev:
        prev = url_for('api.get_all_users', page=page-1)
    if pagination.has_next:
        next = url_for('api.get_all_users', page=page+1)
    response_object = {
        'status': 'success',
        'data': {
            'users': [user.to_json() for user in users],
            'prev': prev,
            'next': next,
            'total': pagination.total,
        }
    }
    return jsonify(response_object), 200
