import os
import json

from flask import Blueprint, send_from_directory, current_app, request
from flask_login import current_user
from werkzeug.utils import secure_filename
from queries.files import create_new_file
from queries.file_types import get_file_type_by_name
from utils import allowed_file

static_content = Blueprint('static_content', __name__)

@static_content.route('/')
@static_content.route('/<path:path>')
def send_static(path):
    return send_from_directory('static_content', path)


@static_content.route('/upload', methods=['POST'])
def upload_file():

    if 'file' not in request.files:
        return json.dumps({ "filename": None })

    file = request.files['file']

    if file.filename == '':
        return json.dumps({ "filename": None })

    file_type_name = request.form.get('fileType')

    if file_type_name is None:
        return json.dumps({ "filename": None })

    file_type = get_file_type_by_name(file_type_name)

    if file and allowed_file(file.filename, file_type.allowed):
        filename = secure_filename(file.filename)
        filepath = os.path.join( current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        static_content_path = "/static_content/uploads/{}".format(filename)

        create_new_file(
            path=static_content_path, 
            uploaded_by=current_user.id,
            file_type_id=file_type.id
        )

        return json.dumps({ "filename": filename })

    else:
        return json.dumps({ "filename": None })
