import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useUploads = () => {

  const [uploads, setUploads] = useState();
  const [loading, setLoading] = useState(false);

  const refetchUploadsEvent = new CustomEvent('refetch-uploads');

  const fetchUploads = useCallback(() => {
    setLoading(true)
    get('/uploads')
    .then( ({data}) => {
      console.log({data})
      setUploads(data.uploads)
    })
    .catch(error => console.log({error}))
    .finally(() => setLoading(false))
  }, [])

  useEffect(fetchUploads, [fetchUploads]);

  useEffect(() => {
    window.addEventListener('refetch-uploads', fetchUploads, false);
  }, [fetchUploads])

  return { uploads, loading, refetch: fetchUploads, refetchUploadsEvent }

}