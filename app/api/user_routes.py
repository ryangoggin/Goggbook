from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Friend

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
    return user.to_dict()

@user_routes.route('/friends')
@login_required
def user_friends():
    """
    Query for a user's friends by user id and return their user info as a dictionary
    """
    friends = Friend.query.filter(Friend.user_id == current_user.id)
    userFriendLst = []
    for friend in friends:
        userFriendLst.append(friend.friend_id)
    userFriendLst.append(current_user.id)

    friendUsers = User.query.filter(User.id.in_(userFriendLst)).all()
    response = [user.to_dict() for user in friendUsers]

    return {'friends': response}
