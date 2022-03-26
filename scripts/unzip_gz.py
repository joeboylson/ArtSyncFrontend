import gzip
import shutil

in_outs = [
    [
        "static_content\Art-Sync-Gallery-1\Build\ASBUIld.data.gz",
        "static_content\Art-Sync-Gallery-1\Build\ASBUIld.data"
    ], [
        "static_content\Art-Sync-Gallery-1\Build\ASBUIld.framework.js.gz",
        "static_content\Art-Sync-Gallery-1\Build\ASBUIld.framework.js"
    ], [
        "static_content\Art-Sync-Gallery-1\Build\ASBUIld.wasm.gz",
        "static_content\Art-Sync-Gallery-1\Build\ASBUIld.wasm"
    ]
]

for in_out in in_outs:

    file_in, file_out = in_out

    with gzip.open(file_in, 'rb') as f_in:
        with open(file_out, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
