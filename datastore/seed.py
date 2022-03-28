import json

from datastore import Scenes, FileTypes, Files
from datastore.gallery_files import GalleryFiles
from utils.scene import get_scenes
from .db import db
from .seed_data import test_users, test_images, test_3d_objects, test_music
from queries.users import create_user
from queries.galleries import create_user_gallery


def seed_gallery_files():
    print(">>> GALLERY FILES")
    mock_gallery_file_one = GalleryFiles(
        position=1,
        inspect_type="unity-inspect",
        size=1,
        frame=1,
        texture=1,
        gallery_id=1,
        file_id=1,
    )

    mock_gallery_file_two = GalleryFiles(
        position=2,
        inspect_type="unity-inspect",
        size=1,
        frame=1,
        texture=1,
        gallery_id=1,
        file_id=1,
    )

    db.session.add(mock_gallery_file_one)
    db.session.add(mock_gallery_file_two)


def seed_file_types():
    print(">>> FILE TYPES")
    image_file_type = FileTypes(name='image', allowed="jpg,png")
    three_d_file_type = FileTypes(name='objects3d', allowed="obj")
    video_file_type = FileTypes(name='video', allowed="mp4")
    music_file_type = FileTypes(name='music', allowed="mp3")
    
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


def seed_files_for_user(user):

    uploaded_by = user.id

    image_type_id = 1
    three_d__type_id = 2
    music_type_id = 4

    for path in test_images:
        new_file = Files(path=path, uploaded_by=uploaded_by, file_type_id=image_type_id)
        db.session.add(new_file)

    for path in test_3d_objects:
        new_file = Files(path=path, uploaded_by=uploaded_by, file_type_id=three_d__type_id)
        db.session.add(new_file)

    for path in test_music:
        new_file = Files(path=path, uploaded_by=uploaded_by, file_type_id=music_type_id)
        db.session.add(new_file)


def seed_users():
    print(">>> USERS")
    admin = create_user("ADMIN", "admin@admin.com", "admin", True)
    user = create_user("USER", "user@user.com", "user", False)

    seed_galleries_for_user(admin)
    seed_files_for_user(admin)

    seed_galleries_for_user(user)

    for u in test_users:
        _new_user = create_user(*u)
        seed_galleries_for_user(_new_user)


def seed_all():
    seed_file_types()
    seed_scenes()
    seed_users()
    seed_gallery_files()
    db.session.commit()
    