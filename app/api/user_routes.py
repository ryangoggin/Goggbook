from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Friend, Post

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
    Query for a user's friends by user id and return their user info as a dictionary.
    This is for the current user's feed, so the current user is included in this.
    """
    friends = Friend.query.filter(Friend.user_id == current_user.id)
    userFriendLst = []
    for friend in friends:
        userFriendLst.append(friend.friend_id)
    userFriendLst.append(current_user.id)

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
