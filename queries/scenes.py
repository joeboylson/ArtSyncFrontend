from datastore import Scenes


def get_scene_by_id(id):
    try:
        return Scenes.query.get(id)
    except Exception as e:
        print(e)
        return None


def get_all_scenes():
    try:
        return Scenes.query.all()
    except Exception as e:
        print(e)
        return None