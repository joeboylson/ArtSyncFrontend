import json

from flask import Blueprint, request
from datastore.scenes import get_scene_by_id
from flask_login import logout_user, login_required, current_user
from datastore import db, Users, get_user_by_email

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


@protected.route('/profile')
def profile():
    return json.dumps({"success": True, "profile": current_user.to_dict()})


@protected.route('/scene')
def scene():
    scene_id = request.args.get('sceneId')
    scene = get_scene_by_id(scene_id)

    return json.dumps({ "success": True, "scene": scene.to_dict() })


@protected.route('/user_is_admin')
def data():
    return json.dumps({ "is_admin": current_user.is_admin})