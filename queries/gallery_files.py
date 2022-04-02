from datastore import db, UserGalleries, Galleries, Files
from sqlalchemy.orm import join
from datastore import GalleryFiles


def get_user_galleries_by_user_id(user_id):
    try:
        q = db.session.query(Galleries)
        q = q.select_from(join(UserGalleries, Galleries))
        q = q.filter(UserGalleries.user_id == user_id)
        return q.all()
    except Exception as e:
        print(e)
        return None


def get_gallery_file_by_id(gallery_file_id):
    try:
        q = db.session.query(GalleryFiles)
        q = q.filter(GalleryFiles.id == gallery_file_id)
        return q.one()
    except Exception as e:
        print(e)
        return None


def get_gallery_files_by_gallery_id(gallery_id):
    try:
        q = db.session.query(GalleryFiles, Galleries, Files)
        q = q.select_from(join(GalleryFiles, Galleries).join(Files))
        q = q.filter(GalleryFiles.gallery_id == gallery_id)
        return q.all()
    except Exception as e:
        print(e)
        return None



def create_gallery_file(position, size, frame, texture, inspect_type, gallery_id, file_id):
    try:
        new_gallery_file = GalleryFiles(
            position=position, 
            size=size,
            frame=frame,
            texture=texture,
            gallery_id=gallery_id, 
            inspect_type=inspect_type,
            file_id=file_id
        )

        db.session.add(new_gallery_file)
        db.session.commit()
        return new_gallery_file
    except Exception as e:
        print(e)
        return None


def update_gallery_file(gallery_file_id, position, size, frame, texture, inspect_type):
    try:
        q = db.session.query(GalleryFiles)
        q = q.filter_by(id=gallery_file_id)
        q = q.update({
            "position": position, 
            "size": size,
            "frame": frame,
            "texture": texture,
            "inspect_type": inspect_type,
        })

        db.session.commit()
        return get_gallery_file_by_id(gallery_file_id)
    except Exception as e:
        print(e)
        return None


def delete_gallery_file_by_id(gallery_file_id):
    try:
        q = db.session.query(GalleryFiles)
        found_gallery_file = q.filter_by(id=gallery_file_id).one()
        db.session.delete(found_gallery_file)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False
