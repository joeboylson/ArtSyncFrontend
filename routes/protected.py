import json

from queries import *
from flask import Blueprint, request, current_app, abort
from flask_login import logout_user, current_user
from utils.request import serialize_array, serialize_value

protected = Blueprint('protected', __name__)

@protected.before_request
# @login_required
def before_request():
    if current_app.debug:
        return

    if not current_user:
        abort(401)


@protected.route('/logout')
def logout():
    logout_user()
    return "successfully logged out"


@protected.route('/user_is_admin')
def user_is_admin():
    return json.dumps({ "is_admin": current_user.is_admin})


@protected.route('/profile')
def profile():
    return json.dumps({"success": True, "profile": current_user.to_dict()})


@protected.route('/user')
def user():
    user_id = request.args.get('userId')
    user = get_user_by_id(user_id)
    return json.dumps({"success": True, "user": user.to_dict()})

@protected.route('/scenes')
def scenes():
    scenes = get_all_scenes()
    scenes_serialized = [s.to_dict() for s in scenes]
    return json.dumps({ "scenes": scenes_serialized })   


@protected.route('/scene')
def scene():
    scene_id = request.args.get('sceneId')
    scene = get_scene_by_id(scene_id)

    return json.dumps({ "success": True, "scene": scene.to_dict() })


@protected.route('/user_galleries')
def user_galleries():
    user_id = request.args.get('userId') or current_user.id
    user_galleries = get_user_galleries_by_user_id(user_id)
    user_galleries_serialized = serialize_array(user_galleries)
    return json.dumps({ "success": True, "user_galleries": user_galleries_serialized })


@protected.route('/explore_galleries')
def explore_galleries():
    explore_galleries = get_explore_galleries()
    explore_galleries_serialized = serialize_array(explore_galleries)
    return json.dumps({ "success": True, "explore_galleries": explore_galleries_serialized })


@protected.route('/user_gallery')
def user_gallery():
    gallery_id = request.args.get('galleryId')
    user_gallery = get_user_gallery_by_id(gallery_id)

    if user_gallery is None:
        return json.dumps({ "success": True, "user_gallery": None })

    user_gallery_serialized = serialize_array(list(user_gallery))
    return json.dumps({ "success": True, "user_gallery": user_gallery_serialized })


@protected.route('/gallery')
def gallery():
    gallery_id = request.args.get('galleryId')
    gallery = get_gallery_by_id(gallery_id)

    if gallery is None:
        return json.dumps({ "success": True, "gallery": None })

    gallery_serialized = gallery.to_dict()
    return json.dumps({ "success": True, "gallery": gallery_serialized })


@protected.route('/gallery_files')
def gallery_files():
    gallery_id = request.args.get('galleryId')
    gallery_files = get_gallery_files_by_gallery_id(gallery_id)

    print(gallery_files)

    if gallery_files is None:
        return json.dumps({ "success": True, "gallery_files": None })

    gallery_serialized = serialize_array(gallery_files)
    return json.dumps({ "success": True, "gallery_files": gallery_serialized })



@protected.route('/new_gallery', methods=["POST"])
def new_gallery():
    scene_id = request.form.get('sceneId')

    if not scene_id:
        abort(406)

    scene = get_scene_by_id(scene_id)

    if not scene:
        abort(406)

    name = request.form.get('name')
    is_public = request.form.get('isPublic') == "true"

    new_gallery = create_user_gallery(current_user.id, scene.id, name, is_public)
    return json.dumps({ "success": True, "new_gallery": new_gallery.to_dict() })


@protected.route('/save_gallery_files', methods=["POST"])
def save_gallery_files():

    request_data = request.get_json()

    gallery_id = request_data["galleryId"]
    file_id = request_data["fileId"]
    inspect_type = request_data["inspectType"]

    result = []
    for _gallery_file in request_data["galleryFiles"]:
        existing_gallery_file = get_gallery_file_by_id(_gallery_file["id"])

        if existing_gallery_file is None:
            # position, size, frame, texture, inspect_type, gallery_id, file_id
            new_gallery_file = create_gallery_file(
                position=_gallery_file["position"],
                size=_gallery_file["size"],
                frame=_gallery_file["frame"],
                texture=_gallery_file["texture"],
                inspect_type=inspect_type,
                gallery_id=gallery_id,
                file_id=file_id,
            )

            result.append(new_gallery_file.to_dict())
            continue

        # gallery_file_id, position, size, frame, texture, inspect_type
        updated_gallery_file = update_gallery_file(
            gallery_file_id=existing_gallery_file.id,
            position=_gallery_file["position"],
            size=_gallery_file["size"],
            frame=_gallery_file["frame"],
            texture=_gallery_file["texture"],
            inspect_type=inspect_type,
        )

        result.append(updated_gallery_file.to_dict())
        continue

    return json.dumps(result)


@protected.route('/delete_gallery_file', methods=["POST"])
def delete_gallery_file():

    request_data = request.get_json()

    is_deleted = delete_gallery_file_by_id(
        gallery_file_id=request_data["gallery_file_id"]
    )

    return json.dumps({ "success": is_deleted })


@protected.route('/uploads')
def uploads():
    user_files = get_user_files(1)
    user_files_serialized = serialize_array(user_files)
    return json.dumps({ "uploads": user_files_serialized })