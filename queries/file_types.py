from datastore import db, FileTypes
from werkzeug.security import generate_password_hash


def get_file_type_by_name(name):
    try:
        return FileTypes.query.filter_by(name=name).first()
    except Exception as e:
        print(e)
        return None