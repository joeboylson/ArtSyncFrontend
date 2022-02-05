import json

from flask import Blueprint, request, current_app, abort
from datastore.scenes import get_scene_by_id, get_all_scenes
from flask_login import logout_user, login_required, current_user
from datastore import db, Users, get_user_by_email
from queries.galleries import create_user_gallery
from queries.user_galleries import get_user_galleries_by_user_id, get_user_gallery_by_id
from utils.request import serialize_array

protected = Blueprint('protected', __name__)

@protected.before_request
@login_required
def before_request():
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
    user_id = current_user.id
    user_galleries = get_user_galleries_by_user_id(user_id)
    user_galleries_serialized = serialize_array(user_galleries)
    return json.dumps({ "success": True, "user_galleries": user_galleries_serialized })


@protected.route('/user_gallery')
def user_gallery():
    user_id = current_user.id
    gallery_id = request.args.get('galleryId')

    print(gallery_id)

    user_gallery = get_user_gallery_by_id(user_id, gallery_id)

    if user_gallery is None:
        return json.dumps({ "success": True, "user_gallery": None })

    user_gallery_serialized = user_gallery.to_dict()
    return json.dumps({ "success": True, "user_gallery": user_gallery_serialized })


@protected.route('/new_gallery', methods=["POST"])
def new_gallery():
    scene_id = request.form.get('sceneId')

    print(scene_id)

    if not scene_id:
        abort(406)

    scene = get_scene_by_id(scene_id)

    if not scene:
        abort(406)

    name = request.form.get('name')
    is_public = request.form.get('isPublic') == "true"

    new_gallery = create_user_gallery(current_user.id, scene.id, name, is_public)
    return json.dumps({ "success": True, "new_gallery": new_gallery.to_dict() })