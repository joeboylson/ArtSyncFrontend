from datastore import db, UserGalleries, Users, Galleries
from sqlalchemy import select
from sqlalchemy.orm import join

from datastore.scenes import Scenes


def get_user_galleries_by_user_id(user_id):
    try:

      q = db.session.query(Galleries)
      q = q.select_from(join(UserGalleries, Galleries))
      q = q.filter(UserGalleries.user_id == user_id)

      return q.all()

    except Exception as e:
        print(e)
        return None


def get_user_gallery_by_id(user_id, gallery_id):
    try:

      q = db.session.query(Galleries)
      q = q.select_from(join(UserGalleries, Galleries))
      q = q.filter(UserGalleries.user_id == user_id)
      q = q.filter(UserGalleries.gallery_id == gallery_id)

      return q.one()

    except Exception as e:
        print(e)
        return None