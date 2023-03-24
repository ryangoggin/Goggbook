from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment
from ..forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# edit a comment by id

# delete a comment by id
