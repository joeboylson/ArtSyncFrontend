import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useGalleryById = (galleryId) => {
  
  const [gallery, setGallery] = useState();
  const [loading, setLoading] = useState(false);
  const [queryHasRun, setQueryHasRun] = useState(false);

  const fetchGallery = useCallback(() => {
    if (!galleryId) return;

    setLoading(true)
    get(`/gallery?galleryId=${galleryId}`)
    .then(({data}) => setGallery(data.gallery))
    .catch(error => console.log({error}))
    .finally(() => {
      setLoading(false);
      setQueryHasRun(true);
    })
  }, [galleryId])

  useEffect(fetchGallery, [fetchGallery]);

  return { gallery, loading, refetch: fetchGallery, queryHasRun }

}