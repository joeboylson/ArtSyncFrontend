from werkzeug.security import generate_password_hash
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from .db import db

class Users(UserMixin, SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # relationships
    user_galleries = db.relationship('UserGalleries')

    #rules
    serialize_rules = ('-password',)

def get_user_by_email(email):
    try:
        return Users.query.filter_by(email=email).first()
    except Exception as e:
        print(e)
        return None

def create_user(name, email, password, is_admin):
    try:
        new_user = Users(email=email, name=name, password=generate_password_hash(password, method='sha256'), is_admin=is_admin)
        db.session.add(new_user)        
        db.session.commit()
        return new_user
    except Exception as e:
        print(e)
        return None
