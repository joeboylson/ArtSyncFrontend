import PageWrapper from "../../components/PageWrapper";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { useUserGalleryById } from "../../hooks/useUserGalleryById";
import { useMemo } from "react";
import { useSceneById } from "../../hooks/useSceneById";
import UnityScene from "../../layouts/UnityScene";

// import "./style.scss";

const GalleryView = () => {

  const { galleryId } = useParams();
  const { userGallery, loading: galleryLoading } = useUserGalleryById(galleryId);

  const sceneId = useMemo(() => userGallery && userGallery.scene_id );

  const {scene, loading: sceneByIdLoading } = useSceneById(1);

  console.log({scene})

  return (
    <PageWrapper>
      <Loading loading={galleryLoading}>
        <p>{JSON.stringify(userGallery)}</p>
        <hr />
        <p>{JSON.stringify(scene)}</p>

        { scene && <UnityScene scene={scene}/> }
      </Loading>
    </PageWrapper>
  );
};

export default GalleryView;
