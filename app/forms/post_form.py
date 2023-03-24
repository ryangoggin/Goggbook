from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])
    post_pic = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField("User Id", validators=[DataRequired()])
