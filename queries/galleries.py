from flask_login import current_user
from sqlalchemy import and_
from datastore import db, UserGalleries, Galleries
from sqlalchemy.orm import join

from datastore.users import Users


def create_user_gallery(user_id, scene_id, name, is_public):
    try:

        new_gallery = Galleries(name=name, is_public=is_public, scene_id=scene_id)
        db.session.add(new_gallery)
        db.session.commit()
        
        new_user_gallery = UserGalleries(user_is_owner=True, user_id=user_id, gallery_id=new_gallery.id)
        db.session.add(new_user_gallery)
        db.session.commit()
        
        return new_gallery
        
    except Exception as e:
        print(e)
        return None


def get_explore_galleries():
    try:

        q = db.session.query(UserGalleries, Galleries, Users)
        q = q.select_from(join(UserGalleries, Galleries).join(Users))
        q = q.filter(UserGalleries.user_id != current_user.id)
        
        return q.all()
    
    except Exception as e:
        print("Exception", e)
        return None


def get_gallery_by_id(gallery_id):
    try:

        q = db.session.query(Galleries)
        q = q.select_from(join(UserGalleries, Galleries))
        q = q.filter(Galleries.id == gallery_id)

        return q.one()

    except Exception as e:
        print(e)
        return None