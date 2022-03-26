import GalleriesList from "../../layouts/GalleriesList";
import { useMemo } from 'react';
import { useUserGalleries } from "../../hooks/useUserGalleries";
import { formatAPIGalleries } from "../../utils/gallery";

import './style.scss'

const UserGalleries = ({userId, hideGalleriesWithIds = []}) => {

  const {loading, userGalleries } = useUserGalleries(userId, true);
  
  const filteredOtherUserGalleries = useMemo(() => {
    if (!userGalleries) return [];
    return userGalleries.filter(g => {
      const [_, gallery] = g;
      return !hideGalleriesWithIds.includes(gallery.id)
    })
  }, [hideGalleriesWithIds, userGalleries])

  return (
    <GalleriesList
      skeleton={loading}
      galleries={formatAPIGalleries(filteredOtherUserGalleries)}
    />
  );
};

export default UserGalleries;