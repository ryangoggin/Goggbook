from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
