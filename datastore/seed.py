import json

from datastore import Scenes, FileTypes
from utils.scene import get_scenes
from .db import db
from .seed_data import test_users
from queries.users import create_user
from queries.galleries import create_user_gallery


def seed_file_types():
    print(">>> FILE TYPES")
    image_file_type = FileTypes(name='image')
    three_d_file_type = FileTypes(name='3d')
    video_file_type = FileTypes(name='video')
    music_file_type = FileTypes(name='music')
    
    db.session.add(image_file_type)
    db.session.add(three_d_file_type)
    db.session.add(video_file_type)
    db.session.add(music_file_type)


def seed_scenes():
    print(">>> SCENES")
    scenes = get_scenes()
    for scene in scenes:
        name = scene['name']
        folder_path = "\{}".format(scene['folder_path'])
        context = scene['context']

        print(folder_path)

        _new_scene = Scenes(
            name=name, 
            folder_path=folder_path, 
            context_string=json.dumps(context)
        )
        
        db.session.add(_new_scene)


def seed_galleries_for_user(user):
    scene = Scenes.query.first()

    gallery_prefixes = ["First", "Second", "Third"]
    for pre in gallery_prefixes:
        name = "{}'s {} Gallery".format(user.name, pre)
        create_user_gallery(user.id, scene.id, name, True)



def seed_users():
    print(">>> USERS")
    admin = create_user("ADMIN", "admin@admin.com", "admin", True)
    user = create_user("USER", "user@user.com", "user", False)

    seed_galleries_for_user(admin)
    seed_galleries_for_user(user)

    for u in test_users:
        _new_user = create_user(*u)
        seed_galleries_for_user(_new_user)

        



def seed_all():
    seed_file_types()
    seed_scenes()
    seed_users()
    db.session.commit()
    