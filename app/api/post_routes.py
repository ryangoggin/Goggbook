from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename

post_routes = Blueprint('posts', __name__)
