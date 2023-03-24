from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Post, User, Friend, Comment
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
from ..forms import PostForm, CommentForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)


# get all posts
@post_routes.route("")
@login_required
def get_all_posts():
    '''
    queries all posts on GET requests
    '''
    posts = Post.query.order_by(Post.created_at.desc()).all()
    response = [post.to_dict() for post in posts]

    return {'posts': response }


# get all posts by current user and current user's friends for the feed
@post_routes.route("/feed")
@login_required
def get_all_feed_posts():
    '''
    queries posts by you and your friends on GET requests
    '''
    friends = Friend.query.filter(Friend.user_id == current_user.id)
    feedUsersLst = []
    for friend in friends:
        feedUsersLst.append(friend.friend_id)
    feedUsersLst.append(current_user.id)

    posts = Post.query.filter(Post.user_id.in_(feedUsersLst)).all()

    response = [post.to_dict() for post in posts]

    return {'posts': response }


# get post by id
@post_routes.route("/<int:id>")
@login_required
def get_post_by_id(id):
    '''
    queries a single post by id on GET requests
    '''
    post=Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    return post.to_dict()


# create a new post
@post_routes.route("", methods=['POST'])
@login_required
def create_new_post():
    '''
    create a new post and return it as a dictionary if successful
    '''
    form = PostForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    errors = {}

    if len(form.data["content"]) > 2000:
            errors["content"] = "Post content must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        # post with a post_pic
        if form.data['post_pic']:
            image = form.data['post_pic']

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                errors["image"] = "Error uploading image"
                return jsonify({"errors": errors}), 400

            new_post = Post(
                user_id=form.data["user_id"],
                content=form.data["content"],
                post_pic=upload["url"],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
        # post without a post_pic
        new_post = Post(
            user_id=form.data["user_id"],
            content=form.data["content"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return jsonify({"errors": form.errors}), 400


# edit a post
@post_routes.route("/<int:id>", methods=['PUT'])
@login_required
def edit_post(id):
    '''
    query a post, update it if it exists, and return it as a dictionary if successful
    '''
    post = Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    if post.user_id != current_user.id:
         return jsonify({'error': 'Cannot edit posts that are not your\'s'}), 403

    form = PostForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    errors = {}

    if len(form.data["content"]) > 2000:
            errors["content"] = "Messages must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        post.content=form.data["content"] or post.content
        post.updated_at=datetime.utcnow()

        db.session.commit()
        return post.to_dict()
    return jsonify({"errors": form.errors}), 400


# delete a post
@post_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_post(id):
    '''
    query a post, update it if it exists, and return it as a dictionary if successful
    '''
    post = Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    if post.user_id != current_user.id:
         return jsonify({'error': 'Cannot delete posts that are not your\'s'}), 403

    db.session.delete(post)
    db.session.commit()
    return {"message": f"Successfully deleted post #{post.id}"}


# create a new comment
@post_routes.route("/<int:id>/comment", methods=['POST'])
@login_required
def create_new_comment(id):
    '''
    create a new comment and return it as a dictionary if successful
    '''
    form = CommentForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    errors = {}

    if len(form.data["content"]) > 2000:
            errors["content"] = "Comment content must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        new_comment = Comment(
            user_id=form.data["user_id"],
            post_id=id,
            content=form.data["content"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return jsonify({"errors": form.errors}), 400
