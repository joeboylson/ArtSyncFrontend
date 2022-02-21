from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from .db import db


class Users(UserMixin, SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(1000), unique=True)
    password = db.Column(db.String(1000), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # relationships
    user_galleries = db.relationship('UserGalleries')

    #rules
    serialize_rules = ('-password',)
