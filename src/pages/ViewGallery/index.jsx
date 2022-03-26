import Loading from "../../components/Loading";
import UnityScene from "../../layouts/UnityScene";
import UnityInspectControls from "../../layouts/UnityInspectControls";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSceneById } from "../../hooks/useSceneById";
import { useGalleryById } from "../../hooks/useGalleryById";
import { useUnitySendMessage } from "../../hooks/useUnitySendMessage";

const ViewGallery = () => {

  const [unityContext, setUnityContext] = useState()

  const { galleryId } = useParams();
  const { gallery, loading: galleryloading } = useGalleryById(galleryId);

  const isPublic = useMemo(() => gallery?.is_public, [gallery])

  const { scene, loading: sceneLoading } = useSceneById(isPublic && gallery?.scene_id);

  const handleUnityLoad = (unityContext) => {
    setUnityContext(unityContext)
  }

  return (
    <Loading loading={galleryloading || sceneLoading}>
      {scene && <UnityScene scene={scene} onLoad={handleUnityLoad}/>}
      {unityContext && <UnityInspectControls unityContext={unityContext}/>}
    </Loading>
  );
};

export default ViewGallery;
