from flask_wtf import FlaskForm
from wtforms import StringField


class UserForm(FlaskForm):
    bio = StringField('Bio')
    profile_pic = StringField('Profile Pic')
