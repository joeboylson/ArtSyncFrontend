import json

from flask import Blueprint, current_app
from flask_login import current_user, login_required

admin = Blueprint('admin', __name__)

@admin.before_request
@login_required
def before_request():
    if current_app.debug:
        return

    if not current_user and current_user.is_admin:
        abort(401)