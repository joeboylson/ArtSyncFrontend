from datastore import db, Files


def create_new_file(path, uploaded_by):
    try:
        new_file = Files(path=path, uploaded_by=uploaded_by)
        db.session.add(new_file)
        db.session.commit()
        return new_file

    except Exception as e:
        print(e)
        return None


def get_user_files(user_id):
  try:
    q = db.session.query(Files)
    q = q.filter(Files.uploaded_by == user_id)
    return q.all()
  except Exception as e:
    print(e)
    return None