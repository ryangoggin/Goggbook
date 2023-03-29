from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def is_email(form, field):
    # Checking if entered email has an @ and proper domain
    email = field.data
    split_email = email.split(".")
    if "@" not in email or split_email[-1] not in ["com", "net", "org", "edu", "io"]:
        raise ValidationError('Please enter a valid email.')


class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=5, max=50), username_exists])
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=2, max=40)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=2, max=40)])
    email = StringField('Email', validators=[DataRequired(), Length(max=255), user_exists, is_email])
    password = StringField('Password', validators=[DataRequired(), Length(min=6, max=40)])
    day = IntegerField('Day', validators=[DataRequired()])
    month = IntegerField('Month', validators=[DataRequired()])
    year = IntegerField('Year', validators=[DataRequired()])
