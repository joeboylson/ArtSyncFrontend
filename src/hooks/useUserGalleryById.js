import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useUserGalleryById = (galleryId) => {

  const [userGallery, setUserGallery] = useState();
  const [loading, setLoading] = useState(false);

  const fetchUserGallery = useCallback(() => {

    if (!galleryId) return;

    console.log("FETCH USER GALLERY", galleryId)

    setLoading(true)
    get(`/user_gallery?galleryId=${galleryId}`).then(({data}) => {
      setUserGallery(data.user_gallery);
      setLoading(false);
    })
    .catch(err => console.log(err))
  }, [galleryId])

  useEffect(fetchUserGallery, [fetchUserGallery]);

  return { userGallery, loading, refetch: fetchUserGallery }

}