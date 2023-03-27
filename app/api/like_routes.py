from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Like


like_routes = Blueprint('likes', __name__)


# delete a like by id
@like_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_like(id):
    '''
    query a like, delete it if it exists, and return and return a message if successful
    '''
    like = Like.query.get(id)

    if like is None:
        return jsonify({'error': 'Like not found'}), 404

    if like.user_id != current_user.id:
         return jsonify({'error': 'Cannot delete likes that are not your\'s'}), 403

    db.session.delete(like)
    db.session.commit()
    return {"message": f"Successfully deleted like #{like.id}"}
