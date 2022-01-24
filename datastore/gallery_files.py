from sqlalchemy_serializer import SerializerMixin
from .db import db

class GalleryFiles(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)

    # relationships
    gallery_id = db.Column(db.Integer, db.ForeignKey('galleries.id'), default=-1)
    file_id = db.Column(db.Integer, db.ForeignKey('files.id'), default=-1)