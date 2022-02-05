import UnityScene from "../../layouts/UnityScene";
import UnityInspectControls from "../../layouts/UnityInspectControls";
import UnityPauseControls from "../../layouts/UnityPauseControls";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useSceneById } from "../../hooks/useSceneById";

import "./style.scss";

const SceneTest = () => {

  const [currentUnityContext, setCurrentUnityContext] = useState();

  const { scene, loading } = useSceneById(1);

  return (
      <Loading loading={loading}>
        <div id="unity-scene">
          { scene && 
            <div>
              <UnityScene scene={scene} onLoad={setCurrentUnityContext}/>
              <UnityInspectControls currentUnityContext={currentUnityContext}/>
              <UnityPauseControls/>
            </div>
          }
        </div>
      </Loading>
    );

};

export default SceneTest;
