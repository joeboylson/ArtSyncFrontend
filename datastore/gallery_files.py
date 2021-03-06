from sqlalchemy_serializer import SerializerMixin
from .db import db


class GalleryFiles(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String(1000), nullable=False)
    inspect_type = db.Column(db.String(1000), nullable=False)
    size = db.Column(db.String(1000))
    frame = db.Column(db.String(1000))
    texture = db.Column(db.String(1000))

    # relationships
    gallery_id = db.Column(db.Integer, db.ForeignKey('galleries.id'), default=-1)
    file_id = db.Column(db.Integer, db.ForeignKey('files.id'), default=-1)
