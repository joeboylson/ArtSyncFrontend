from sqlalchemy_serializer import SerializerMixin
from .db import db

class Galleries(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), default="Unnamed Gallery")
    is_public = db.Column(db.Boolean, default=False)

    # relationships
    user_galleries = db.relationship('UserGalleries')
    gallery_files = db.relationship('GalleryFiles')
    scene_id = db.Column(db.Integer, db.ForeignKey('scenes.id'), default=-1)
