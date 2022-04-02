export const formatAPIGalleries = (apiGalleries) => {

  if (!apiGalleries) return [];

  return apiGalleries.map(galleryItem => {
    const [userGallery, gallery, user] = galleryItem;

    const formattedGalleryItem = {
      id: gallery.id,
      name: gallery.name,
      isPublic: userGallery.is_public,
      thumbnail: gallery.thumbnail
    }

    if (user) {
      formattedGalleryItem.user = {
        id: user.id,
        name: user.name
      }
    }

    return formattedGalleryItem
  })

}
