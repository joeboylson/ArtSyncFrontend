from datastore import db, Files, FileTypes
from sqlalchemy.orm import join

def create_new_file(path, uploaded_by, file_type_id):
    try:
        new_file = Files(path=path, uploaded_by=uploaded_by, file_type_id=file_type_id)
        db.session.add(new_file)
        db.session.commit()
        return new_file

    except Exception as e:
        print(e)
        return None


def get_user_files(user_id):
  try:

    print(user_id)

    q = db.session.query(Files, FileTypes)
    q = q.select_from(join(Files, FileTypes))
    q = q.filter(Files.uploaded_by == user_id)

    return q.all()
  
  except Exception as e:
    print(e)
    return None