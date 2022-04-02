import Loading from "../../components/Loading";
import UnityScene from "../../layouts/UnityScene";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSceneById } from "../../hooks/useSceneById";

const PreviewScene = () => {

  const { sceneId } = useParams();
  const { scene, loading} = useSceneById(sceneId)

  return (
    <Loading loading={loading}>
      { scene && <UnityScene scene={scene}/> }
    </Loading>
  );
};

export default PreviewScene;
