from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment
from ..forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# edit a comment by id
@comment_routes.route("/<int:id>", methods=['PUT'])
@login_required
def edit_comment(id):
    '''
    create a new comment and return it as a dictionary if successful
    '''
    comment = Comment.query.get(id)

    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404

    if comment.user_id != current_user.id:
         return jsonify({'error': 'Cannot edit comments that are not your\'s'}), 403

    form = CommentForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    errors = {}

    if len(form.data["content"]) > 2000:
            errors["content"] = "Comment content must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        comment.content=form.data["content"] or comment.content
        comment.updated_at=datetime.utcnow()

        db.session.commit()
        return comment.to_dict()
    return jsonify({"errors": form.errors}), 400

# delete a comment by id
@comment_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_comment(id):
    '''
    query a comment, delete it if it exists, and return and return a message if successful
    '''
    comment = Comment.query.get(id)

    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404

    if comment.user_id != current_user.id:
         return jsonify({'error': 'Cannot delete comments that are not your\'s'}), 403

    db.session.delete(comment)
    db.session.commit()
    return {"message": f"Successfully deleted comment #{comment.id}"}
