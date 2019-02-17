from flask import current_app, jsonify, request, url_for

from . import api
from app.models import Post


@api.route('/posts', methods=['GET'])
def get_posts():
    page = request.args.get('page', 1, type=int)
    pagination = Post.query.paginate(
        page,
        per_page=current_app.config['POSTS_PER_PAGE'],
        error_out=False
    )
    posts = pagination.items
    prev, next = None, None
    if pagination.has_prev:
        prev = url_for('api.get_posts', page=page-1)
    if pagination.has_next:
        next = url_for('api.get_posts', page=page+1)
    response_object = {
        'status': 'success',
        'data': {
            'posts': [post.to_json() for post in posts],
            'prev': prev,
            'next': next,
            'total': pagination.total
        }
    }
    return jsonify(response_object), 200
