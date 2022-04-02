import Loading from "../../components/Loading";
import UnityScene from "../../layouts/UnityScene";
import UnityInspectControls from "../../layouts/UnityInspectControls";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSceneById } from "../../hooks/useSceneById";
import { useGalleryById } from "../../hooks/useGalleryById";
import { serverHostname } from "../../utils/env";

const ViewGallery = () => {

  const [unityContext, setUnityContext] = useState();
  const { galleryId } = useParams();
  const { gallery, loading: galleryloading } = useGalleryById(galleryId);
  const isPublic = useMemo(() => gallery?.is_public, [gallery])
  const { scene, loading: sceneLoading } = useSceneById(isPublic && gallery?.scene_id);

  useEffect(() => {
    if (unityContext?.send) {      
      document.addEventListener('keydown', (e) => {
        unityContext.send("GameController","LoadSong",`${serverHostname}/static_content/uploads/SmoothJazz.mp3`)        
      });
    }
  }, [unityContext])

  const handleUnityLoad = (unityContext) => setUnityContext(unityContext);

  const loading = useMemo(() => (
    galleryloading ||
    sceneLoading
  ), [ galleryloading, sceneLoading])

  return (
    <Loading loading={loading}>
      {scene && <UnityScene scene={scene} onLoad={handleUnityLoad}/>}
      {unityContext && <UnityInspectControls unityContext={unityContext}/>}
    </Loading>
  );
};

export default ViewGallery;
