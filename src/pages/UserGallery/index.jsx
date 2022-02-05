import PageWrapper from "../../components/PageWrapper";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { useUserGalleryById } from "../../hooks/useUserGalleryById";
import { isEmpty } from "lodash";

// import "./style.scss";

const UserGallery = () => {

  const { galleryId } = useParams();
  const { userGallery, loading: galleryLoading } = useUserGalleryById(galleryId);

  console.log({userGallery})

  return (
    <PageWrapper>
      <Loading loading={galleryLoading}>
        <p>{JSON.stringify(userGallery)}</p>
      </Loading>
    </PageWrapper>
  );
};

export default UserGallery;
