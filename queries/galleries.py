from datastore import db, UserGalleries, Galleries


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
