import ScenesList from "../../layouts/ScenesList";
import UnityScene from "../../layouts/UnityScene";
import UnityControls from "../../layouts/UnityControls";
import FileUpload from "../../components/FileUpload";

import { useMemo, useState } from "react";
import { isEmpty } from "lodash";

import "./style.scss";
import UploadsList from "../../layouts/UploadsList";
import { useUploads } from "../../hooks/useUploads";
import PageWrapper from "../../layouts/PageWrapper";

const Home = () => {
  const [currentScene, setCurrentScene] = useState();
  const [currentUnityContext, setCurrentUnityContext] = useState();

  const { refetchUploadsEvent } = useUploads();

  const handleSceneSelect = (scene) => {
    setCurrentScene(scene);
  };

  const showScene = useMemo(() => !isEmpty(currentScene), [currentScene]);

  // show the unity scene and controls
  if (showScene) {
    return (
      <div id="unity-scene">
        <UnityScene
          currentScene={currentScene}
          onLoad={setCurrentUnityContext}
        />

        <UnityControls
          currentUnityContext={currentUnityContext}
          setCurrentUnityContext={setCurrentUnityContext}
          currentScene={currentScene}
          setCurrentScene={setCurrentScene}
        />
      </div>
    );
  }

  // show the scenes list to choose a scene
  else {
    return (
      <PageWrapper>
        <div id="home">
          <div id="scenes-list-wrapper">
            <h3>Scenes:</h3>
            <ScenesList
              onSceneSelect={handleSceneSelect}
              currentScene={currentScene}
            />
          </div>

          <div id="upload-images-wrapper">
            <FileUpload
              afterUpload={() => window.dispatchEvent(refetchUploadsEvent)}
            />
            <UploadsList />
          </div>
        </div>
      </PageWrapper>
    );
  }
};

export default Home;
