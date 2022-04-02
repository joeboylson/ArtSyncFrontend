from datastore import db, Users
from werkzeug.security import generate_password_hash


def get_user_by_email(email):
    try:
        return Users.query.filter_by(email=email).first()
    except Exception as e:
        print(e)
        return None


def get_user_by_id(id):
    try:
        return Users.query.filter_by(id=id).first()
    except Exception as e:
        print(e)
        return None


def create_user(name, email, password, is_admin):
    try:
        new_user = Users(email=email, name=name, password=generate_password_hash (password, method='sha256'), is_admin=is_admin)
        db.session.add(new_user)        
        db.session.commit()
        return new_user
    except Exception as e:
        print(e)
        return None

