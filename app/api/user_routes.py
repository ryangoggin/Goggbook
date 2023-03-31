from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Friend, Post
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
from app.forms import UserForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    return user.to_dict()

@user_routes.route('/<int:id>/friends')
@login_required
def user_friends(id):
    """
    Query for a user's friends by the user's id and returns them in a dictionary
    """
    user = User.query.get(id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    friends = Friend.query.filter(Friend.user_id == user.id)
    userFriendLst = []
    for friend in friends:
        userFriendLst.append(friend.friend_id)

    friendUsers = User.query.filter(User.id.in_(userFriendLst)).all()
    response = [user.to_dict() for user in friendUsers]

    return {'friends': response}

@user_routes.route('/friends')
@login_required
def current_user_friends():
    """
    Query for the current user's friends by user id and return the freinds' user info as a dictionary.
    """
    friends = Friend.query.filter(Friend.user_id == current_user.id)
    userFriendLst = []
    for friend in friends:
        userFriendLst.append(friend.friend_id)

    friendUsers = User.query.filter(User.id.in_(userFriendLst)).all()
    response = [user.to_dict() for user in friendUsers]

    return {'friends': response}

# get all posts by the profile user for the profile page feed
@user_routes.route("/<int:id>/feed")
@login_required
def get_all_feed_posts(id):
    '''
    queries posts by profile user on GET requests
    '''
    user = User.query.get(id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    posts = Post.query.filter(Post.user_id == id).all()

    response = [post.to_dict() for post in posts]

    return {'posts': response }


#update current user's bio
@user_routes.route("/bio", methods=['PUT'])
@login_required
def update_user_bio():
    '''
    updates the current users bio
    '''
    user = User.query.get(current_user.id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    form = UserForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    errors = {}

    if len(form.data["bio"]) > 150:
            errors["bio"] = "Bios must be less than 150 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        user.bio=form.data["bio"] # cannot include "or user.bio" in order to allow for empty string bios

        db.session.commit()
        return user.to_dict()
    return jsonify({"errors": form.errors}), 400


#update a user's profile picture
@user_routes.route("/pfp", methods=['PUT'])
@login_required
def update_profile_pic():
    '''
    updates the current user's profile picture
    '''
    user = User.query.get(current_user.id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    form = UserForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    errors = {}

    if form.validate_on_submit():
        if form.data['profile_pic']:
            image = form.data['profile_pic']

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                errors["image"] = "Error uploading image"
                return jsonify({"errors": errors}), 400


            user.profile_pic=upload["url"]

            db.session.commit()
            return user.to_dict()
        # no profile_pic given in form (shouldn't be reached due to front end validation)
        errors["profile_pic"] = "Need to select a profile pic to update with"
        return jsonify({"errors": errors}), 400
    return jsonify({"errors": form.errors}), 400
