from sqlalchemy_serializer import SerializerMixin
from .db import db

class FileTypes(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), default="")
    allowed = db.Column(db.String(1000), default="")

    # relationships
    files = db.relationship('Files')
