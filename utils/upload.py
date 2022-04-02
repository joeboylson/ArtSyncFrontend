import os

REL_UPLOADS_FOLDER = "static_content/uploads"

def allowed_file(filename, allowed_extensions_string):

    print("ALLOWED FILE")

    allowed_extensions = allowed_extensions_string.split(",")

    print(allowed_extensions)
    print(filename)

    is_filename = '.' in filename 
    filename_is_allowed =  filename.split('.')[-1].lower() in allowed_extensions

    print("is_filename", is_filename)
    print("filename_is_allowed", filename_is_allowed)

    return is_filename and filename_is_allowed


def get_uploads():
    try:
        uploads = []
        for file in os.listdir(REL_UPLOADS_FOLDER):
            filepath = os.path.join(REL_UPLOADS_FOLDER, file)
            uploads.append(filepath)

        return uploads

    except Exception as e:
        print("ERROR GETTING UPLOADS")
        print(e)
