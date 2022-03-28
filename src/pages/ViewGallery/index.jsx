import Loading from "../../components/Loading";
import UnityScene from "../../layouts/UnityScene";
import UnityInspectControls from "../../layouts/UnityInspectControls";
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSceneById } from "../../hooks/useSceneById";
import { useGalleryById } from "../../hooks/useGalleryById";
import { useGalleryFilesByGalleryId } from "../../hooks/useGalleryFilesByGalleryId";
import { useUnitySendMessage } from "../../hooks/useUnitySendMessage";
import { notifyInfo } from "../../utils/notification";
import { formatAPIGalleriesFiles } from "../../utils/galleryFiles";

const ViewGallery = () => {

  const [unityContext, setUnityContext] = useState();

  const { 
    uploadArt, 
    loadLargeObject, 
    loadSmallObject
  } = useUnitySendMessage(unityContext)

  const { galleryId } = useParams();
  const { gallery, loading: galleryloading } = useGalleryById(galleryId);
  const { galleryFiles, loading: galleryFilesloading } = useGalleryFilesByGalleryId(galleryId);

  const formattedGalleryFiles = formatAPIGalleriesFiles(galleryFiles)

  const isPublic = useMemo(() => gallery?.is_public, [gallery])

  const { scene, loading: sceneLoading } = useSceneById(isPublic && gallery?.scene_id);

  useEffect(() => {
    if (!unityContext) return;

    const loadArtDebounced = debounce(() => {
      if (formattedGalleryFiles) {
        formattedGalleryFiles.forEach((ff, i) => {
          const { size, frame, position, texture, inspectType, url } = ff;
          setTimeout(() => {
            console.log(`UPLOADING: ${url}`)
            if (inspectType === "unity-inspect") {
              uploadArt(size, frame, position, url)
            };
          }, (1000 * i))
        });
      }
    }, 10000);

    loadArtDebounced();

  }, [unityContext, formattedGalleryFiles, uploadArt])

  const handleUnityLoad = (unityContext) => {
    setUnityContext(unityContext);
  }

  const loading = useMemo(() => (
    galleryloading ||
    galleryFilesloading ||
    sceneLoading
  ), [ galleryloading, galleryFilesloading, sceneLoading])

  return (
    <Loading loading={loading}>
      {scene && <UnityScene scene={scene} onLoad={handleUnityLoad}/>}
      {unityContext && <UnityInspectControls unityContext={unityContext}/>}
    </Loading>
  );
};

export default ViewGallery;
