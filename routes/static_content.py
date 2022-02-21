import os

from flask import Blueprint, send_from_directory, current_app, request
from flask_login import current_user
from werkzeug.utils import secure_filename
from queries.files import create_new_file
from utils import allowed_file

static_content = Blueprint('static_content', __name__)

@static_content.route('/')
@static_content.route('/<path:path>')
def send_static(path):
    return send_from_directory('static_content', path)


@static_content.route('/upload', methods=['POST'])
def upload_file():

    if 'file' not in request.files:
        return None

    file = request.files['file']

    if file.filename == '':
        return None

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join( current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        static_content_path = "/static_content/uploads/{}".format(filename)
        create_new_file(path=static_content_path, uploaded_by=current_user.id)

        return filepath
