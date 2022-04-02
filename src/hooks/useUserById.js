import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useUserById = (userId) => {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(() => {
    if (!userId) return;

    setLoading(true)
    get(`/user?userId=${userId}`)
    .then(({data}) => setUser(data.user))
    .catch(error => console.log({error}))
    .finally(() => setLoading(false))
  }, [userId])

  useEffect(fetchUser, [fetchUser]);

  return { user, loading, refetch: fetchUser }

}