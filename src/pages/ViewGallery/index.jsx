import Loading from "../../components/Loading";
import UnityScene from "../../layouts/UnityScene";
import UnityInspectControls from "../../layouts/UnityInspectControls";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSceneById } from "../../hooks/useSceneById";
import { useGalleryById } from "../../hooks/useGalleryById";

const ViewGallery = () => {

  const [unityContext, setUnityContext] = useState();
  const { galleryId } = useParams();
  const { gallery, loading: galleryloading } = useGalleryById(galleryId);
  const isPublic = useMemo(() => gallery?.is_public, [gallery])
  const { scene, loading: sceneLoading } = useSceneById(isPublic && gallery?.scene_id);

  useEffect(() => {
    if (unityContext?.send) {      
      document.addEventListener('keydown', (e) => {

        if (e.key === "~") {
          try {

            const emptyFrame = "http://localhost:5000/static_content/uploads/glare.png"
            const emptyObj = "http://localhost:5000/static_content/uploads/teapot.obj"

            /* INIT */
            unityContext.send("GameController","ArtJson", `1,1,1,${emptyFrame}`);

            unityContext.send("GameController","ObjJson", `0,0,${emptyObj}`);

            unityContext.send("GameController","ObjSJson",`0,0,${emptyObj}`);

            unityContext.send("GameController","LoadSong","http://localhost:5000/static_content/uploads/SmoothJazz.mp3")
          } catch {}
        }
        
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
