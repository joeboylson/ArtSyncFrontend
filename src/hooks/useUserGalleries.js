import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useUserGalleries = () => {

  const [userGalleries, setUserGalleries] = useState();
  const [loading, setLoading] = useState(false);

  const fetchUserGalleries = useCallback(() => {
    setLoading(true)
    get('/user_galleries').then( ({data}) => {
      setUserGalleries(data.user_galleries);
      setLoading(false);
    })
  }, [])

  useEffect(fetchUserGalleries, [fetchUserGalleries]);

  return { userGalleries, loading, refetch: fetchUserGalleries }

}