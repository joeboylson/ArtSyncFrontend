import json

from .db import db

# IMPORT MODELS AND METHODS
from .file_types import *
from .files import *
from .galleries import *
from .gallery_files import *
from .scenes import *
from .user_galleries import *
from .users import *

# SEEDS
from .seed import seed_all

def init_db(production=False):

    print("::: INITIALIZING DB", production)

    # if production:
    #    return

    print("::: DROPPING ALL TABLES")
    db.drop_all()

    print("::: CREATING ALL TABLES")
    db.create_all()

    print("::: SEEDING DB")
    seed_all()
