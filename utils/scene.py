import os

def get_scenes():

    try:
        scenes = []
        for root, _, files in os.walk('static_content'):
            for filename in files:
                if filename == "GUID.txt":

                    name = root.split("/")[-1]
                    filepath = os.path.join(root, filename)

                    with open(filepath) as guid_txt:
                        guid = guid_txt.readline().rstrip()

                    build_folderpath = os.path.join(root, "Build")
                    build_folder_files = os.listdir(build_folderpath)

                    loader_url = next(
                        name for name in build_folder_files if name.endswith(".loader.js"))
                    data_url = next(
                        name for name in build_folder_files if name.endswith(".data"))
                    framework_url = next(
                        name for name in build_folder_files if name.endswith(".framework.js"))
                    code_url = next(
                        name for name in build_folder_files if name.endswith(".wasm"))

                    # camelCase for JS
                    context = {
                        "loaderUrl": os.path.join(build_folderpath, loader_url),
                        "dataUrl": os.path.join(build_folderpath, data_url),
                        "frameworkUrl": os.path.join(build_folderpath, framework_url),
                        "codeUrl": os.path.join(build_folderpath, code_url),
                    }

                    scenes.append({
                        "id": guid,
                        "folder_path": root,
                        "name": name,
                        "context": context
                    })

        return scenes

    except Exception as e:
        print("ERROR GETTING SCENES")
        print(e)
