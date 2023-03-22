from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Post
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
from ..forms.post_form import PostForm
from datetime import date

post_routes = Blueprint('posts', __name__)


@post_routes.route("")
@login_required
def get_all_posts():
    '''
    queries all posts on GET requests
    '''
    # Query for all posts
    posts = Post.query.order_by(Post.created_at.desc()).all()
    # sorted_posts = sorted(seed_posts, key=lambda post: post['date'], reverse=True)
    response = [post.to_dict() for post in posts]

    return {'posts': response }


@post_routes.route("/<int:id>")
@login_required
def get_post_by_id(id):
    '''
    queries a single post by id on GET requests
    '''
    # Query
    post=Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    return post.to_dict()


@post_routes.route("", methods=['POST'])
@login_required
def create_new_post():
    '''
    create a new post and return it as a dictionary if successful
    '''
    res = request.get_json()

    form = PostForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    errors = {}

    if len(res["content"]) > 2000:
            errors["content"] = "Messages must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():

        # post with a post_pic
        if form.data['post_pic']:
            image = form.data['post_pic']

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return jsonify("error uploading image"), 400

            new_post = Post(
                user_id=res["userId"],
                content=res["content"],
                post_pic=upload["url"],
                created_at=date.today(),
                updated_at=date.today()
            )

            db.session.add(new_post)
            db.session.commit()
            return {'resPost': new_post.to_dict()}
        # post without a post_pic
        else:
            new_post = Post(
                user_id=res["userId"],
                content=res["content"],
                created_at=date.today(),
                updated_at=date.today()
            )

            db.session.add(new_post)
            db.session.commit()
            return {'resPost': new_post.to_dict()}
    return jsonify({"errors": form.errors}), 400
