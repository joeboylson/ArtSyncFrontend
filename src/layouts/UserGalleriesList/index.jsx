import Loading from "../../components/Loading";
import { useMemo } from "react";
import { useUserGalleries } from "../../hooks/useUserGalleries"; 

import "./style.scss"; 
import { Link } from "react-router-dom";

const UserGalleriesList = () => {
  const { loading: useUserGalleriesLoading, userGalleries } = useUserGalleries()

  const isLoading = useMemo(() => useUserGalleriesLoading, [useUserGalleriesLoading]);
  const userHasNoGalleries = useMemo(() => !isLoading && userGalleries && userGalleries.length === 0, [isLoading, userGalleries]);

  console.log({userGalleries})

  return (
    <Loading loading={isLoading}>
      <div>
        { userHasNoGalleries ? (
          <p>user has no galleries</p>
        ) : (
          userGalleries && userGalleries.map(ug => {
            const { name, is_public: isPublic, user_galleries: userGallery } = ug;
            const { gallery_id: galleryId } = userGallery[0];

            return (
              <div>
                <p>Name: {name}</p>
                <p>Public: {isPublic ? "Yes" : "No"}</p>
                <Link to={`/gallery/${galleryId}`}>Details</Link>
              </div>
            )
          })
        )}
      </div>
    </Loading>
  );
};

export default UserGalleriesList;
