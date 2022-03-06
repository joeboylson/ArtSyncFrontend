import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useUserGalleries = (userId, requireUserId=false) => {

  const [userGalleries, setUserGalleries] = useState();
  const [loading, setLoading] = useState(false);

  const fetchUserGalleries = useCallback(() => {
    if (requireUserId && !userId) return;

    setLoading(true);

    const url = `/user_galleries${userId ? `?userId=${userId}` : ""}`
    get(url)
    .then( ({data}) => setUserGalleries(data.user_galleries))
    .catch(error => console.log({error}))
    .finally(() => setLoading(false))
  }, [userId, requireUserId])

  useEffect(fetchUserGalleries, [fetchUserGalleries]);

  return { userGalleries, loading, refetch: fetchUserGalleries };
};