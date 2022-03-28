import { serverHostname } from "./env";

export const formatAPIGalleriesFiles = (apiGalleriesFiles) => {

  if (!apiGalleriesFiles) return [];

  const _data = apiGalleriesFiles.map(galleryFileItem => {
    const [galleryFile, gallery, file] = galleryFileItem;
    const { size, frame, position, texture, inspect_type: inspectType } = galleryFile;

    return {
      size,
      frame,
      position,
      texture,
      inspectType,
      url: `${serverHostname}${file.path}`,
    };

  });

  return [_data[0]]
}