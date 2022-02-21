from sqlalchemy_serializer import SerializerMixin
from .db import db

class Files(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(1000), default="")
    uploaded_by = db.Column(db.Integer, default=-1)

    # relationships
    gallery_files = db.relationship('GalleryFiles')
    file_type_id = db.Column(db.Integer, db.ForeignKey('file_types.id'), default=-1)