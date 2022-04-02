import gzip
import shutil

in_outs = [
    [
        "static_content\Scene2\Build\Scene2.data.gz",
        "static_content\Scene2\Build\Scene2.data"
    ], [
        "static_content\Scene2\Build\Scene2.framework.js.gz",
        "static_content\Scene2\Build\Scene2.framework.js"
    ], [
        "static_content\Scene2\Build\Scene2.wasm.gz",
        "static_content\Scene2\Build\Scene2.wasm"
    ]
]

for in_out in in_outs:

    file_in, file_out = in_out

    with gzip.open(file_in, 'rb') as f_in:
        with open(file_out, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
