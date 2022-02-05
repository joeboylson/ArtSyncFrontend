import { get } from "axios"
import { useCallback, useEffect, useState } from "react"

export const useProfile = () => {

  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(() => {
    setLoading(true)
    get('/profile')
    .then( ({data}) => setProfile(data.profile))
    .finally(() => setLoading(false))
  }, [])

  useEffect(fetchProfile, [fetchProfile]);

  return { profile, loading, refetch: fetchProfile }

}