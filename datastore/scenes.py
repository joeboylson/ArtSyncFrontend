from sqlalchemy_serializer import SerializerMixin
from .db import db


class Scenes(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), default="")
    folder_path = db.Column(db.String(1000), default="")
    context_string = db.Column(db.String(1000), default="")
    
    # relationships
    galleries = db.relationship('Galleries')
