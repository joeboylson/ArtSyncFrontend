from flask_login import current_user
from datastore import db, UserGalleries, Galleries
from sqlalchemy.orm import join


def get_user_galleries_by_user_id(user_id):
    try:

      q = db.session.query(UserGalleries, Galleries)
      q = q.select_from(join(UserGalleries, Galleries))
      q = q.filter(UserGalleries.user_id == user_id)
      
      return q.all()

    except Exception as e:
        print(e)
        return None


def get_user_gallery_by_id(gallery_id):
    try:
      
      q = db.session.query(UserGalleries, Galleries)
      q = q.select_from(join(UserGalleries, Galleries))
      q = q.filter(UserGalleries.gallery_id == gallery_id)

      return q.one()

    except Exception as e:
        print(e)
        return None