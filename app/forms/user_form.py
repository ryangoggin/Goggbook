from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class UserForm(FlaskForm):
    bio = StringField('Bio')
    profile_pic = FileField("Profile Pic", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
