from sqlalchemy_serializer import SerializerMixin
from .db import db

class UserGalleries(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_is_owner = db.Column(db.Boolean, default=False)

    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), default=-1)
    gallery_id = db.Column(db.Integer, db.ForeignKey('galleries.id'), default=-1)