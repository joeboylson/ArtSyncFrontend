import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useExploreGalleries = () => {

  const [exploreGalleries, setExploreGalleries] = useState();
  const [loading, setLoading] = useState(false);
  const [queryHasRun, setQueryHasRun] = useState(false);

  const fetchUserGalleries = useCallback(() => {
    setLoading(true);
    get('/explore_galleries')
    .then(({data}) => setExploreGalleries(data.explore_galleries))
    .catch(error => console.log({error}))
    .finally(() => {
      setLoading(false);
      setQueryHasRun(true);
    })
  }, [])

  useEffect(fetchUserGalleries, [fetchUserGalleries]);

  return { exploreGalleries, loading, refetch: fetchUserGalleries, queryHasRun }

}