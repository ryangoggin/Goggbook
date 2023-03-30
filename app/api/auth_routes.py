from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import date

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            if field == "first_name":
                if error == "Field must be between 2 and 40 characters long.":
                    errorMessages.append('First name must be between 2 and 40 characters long.')
                else:
                    errorMessages.append(f'First Name: {error}')
            elif field == "last_name":
                if error == "Field must be between 2 and 40 characters long.":
                    errorMessages.append('Last name must be between 2 and 40 characters long.')
                else:
                    errorMessages.append(f'Last Name: {error}')
            elif field == "username":
                if error == "Field must be between 5 and 50 characters long.":
                    errorMessages.append('Username must be between 5 and 50 characters long.')
                else:
                    errorMessages.append(f'{error}')
            elif field == "email":
                errorMessages.append(f'{error}')
            elif field == "password":
                if error == "Field must be between 6 and 40 characters long.":
                    errorMessages.append('Password must be between 6 and 40 characters long.')
                else:
                    errorMessages.append(f'Password: {error}')

    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            email=form.data['email'],
            password=form.data['password'],
            birthdate=date(form.data['year'],form.data['month'],form.data['day']),
            bio="",
            profile_pic="https://goggbook-aws.s3.amazonaws.com/Demo-prof-pic.jpg"
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
