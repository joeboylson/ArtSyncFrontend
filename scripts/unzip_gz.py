import gzip
import shutil

in_outs = [
    [
        "static_content\ASBuild\Build\ASBuild.data.gz",
        "static_content\ASBuild\Build\ASBuild.data"
    ], [
        "static_content\ASBuild\Build\ASBuild.framework.js.gz",
        "static_content\ASBuild\Build\ASBuild.framework.js"
    ], [
        "static_content\ASBuild\Build\ASBuild.wasm.gz",
        "static_content\ASBuild\Build\ASBuild.wasm"
    ]
]

for in_out in in_outs:

    file_in, file_out = in_out

    with gzip.open(file_in, 'rb') as f_in:
        with open(file_out, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
