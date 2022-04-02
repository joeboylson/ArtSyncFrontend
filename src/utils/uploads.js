export const sortUploads = (uploads) => {

  if (!uploads) return {};

  const sortedUploads = uploads.reduce((_sorted, apiFileObject) => {
    const [file, fileType] = apiFileObject;
    const key = `${fileType.name}Uploads`

    try {
      _sorted[key].push(file);
    } catch {
      _sorted[key] = [ file ];
    }

    return _sorted
  }, {})

  return sortedUploads;

}

export const filenameFromPath = (path) => {
  return path.replace(/^.*[\\\/]/, '')
}