import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useSceneById = (sceneId) => {

  const [scene, setScene] = useState();
  const [loading, setLoading] = useState(false);

  const fetchScene = useCallback((_sceneId) => {
    if (!_sceneId) return;
    setLoading(true)

    const params = { sceneId: _sceneId }
    get('/scene', { params } )
    .then( ({data}) => setScene(data.scene))
    .catch(error => console.log({error}))
    .finally(() => setLoading(false))
  }, [])

  useEffect(() => fetchScene(sceneId), [fetchScene, sceneId]);

  return { scene, loading, refetch: fetchScene }

}