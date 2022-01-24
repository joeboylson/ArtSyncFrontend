from sqlalchemy_serializer import SerializerMixin
from .db import db

class Scenes(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), default="")
    folder_path = db.Column(db.String(100), default="")
    context_string = db.Column(db.String(500), default="")
    
    # relationships
    galleries = db.relationship('Galleries')


def get_scene_by_id(id):
    try:
        return Scenes.query.get(id)
    except Exception as e:
        print(e)
        return None