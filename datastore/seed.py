import json
from datastore import Scenes, FileTypes
from datastore.users import create_user
from utils.scene import get_scenes
from .db import db


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


def seed_users():
    print(">>> USERS")
    create_user("ADMIN", "admin@admin.com", "admin", True)
    create_user("USER", "user@user.com", "user", False)



def seed_all():
    seed_file_types()
    seed_scenes()
    seed_users()
    db.session.commit()
    