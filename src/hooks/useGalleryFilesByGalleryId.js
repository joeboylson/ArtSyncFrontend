import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useGalleryFilesByGalleryId = (galleryId) => {
  
  const [galleryFiles, setGalleryFiles] = useState();
  const [loading, setLoading] = useState(false);
  const [queryHasRun, setQueryHasRun] = useState(false);

  const fetchGallery = useCallback(() => {
    if (!galleryId) return;

    setLoading(true)
    get(`/gallery_files?galleryId=${galleryId}`)
    .then(({data}) => setGalleryFiles(data.gallery_files))
    .catch(error => console.log({error}))
    .finally(() => {
      setLoading(false);
      setQueryHasRun(true);
    })
  }, [galleryId])

  useEffect(fetchGallery, [fetchGallery]);

  return { galleryFiles, loading, refetch: fetchGallery, queryHasRun }

}