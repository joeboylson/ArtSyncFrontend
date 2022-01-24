import UploadsList from "../../layouts/UploadsList";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { useUnityPause } from "../../hooks/useUnityPause";
import { useUnityInspect } from "../../hooks/useUnityInspect";

import "./style.scss";
import { useOnSpace } from "../../hooks/useOnSpace";

const UnityControls = ({
  currentUnityContext,
  setCurrentUnityContext,
  currentScene,
  setCurrentScene,
}) => {

  const { paused } = useUnityPause();
  const { inspectedImage } = useUnityInspect();
  const { spaceBarIsOpen } = useOnSpace();

  const exit = () => {
    setCurrentUnityContext(null)
    setCurrentScene(null);
  }

  const showInspectionPanel = useMemo(() => 
    !isEmpty(inspectedImage) && !paused,
    [inspectedImage, paused]);

  // const unityInstance = useMemo(() => currentUnityContext && currentUnityContext.unityInstance, [currentUnityContext]);

  console.log({spaceBarIsOpen})
  
  if ( isEmpty(currentUnityContext) ) return null;

  return (
    <div id="unity-controls">

      <div id="panel-paused" className={paused ? "visible" : "invisible"}>
        <h3>PAUSED PANEL</h3>
        <button onClick={exit}>Exit</button>
      </div>

      <div id="panel-inspect" className={showInspectionPanel ? "visible" : "invisible"}>
        <h3>INSPECTION PANEL</h3>
        <p>Inspected Image: {JSON.stringify(inspectedImage)}</p>
      </div>

      {/* NOTE: for testing only: remove */}
      <div id="panel-test" className={spaceBarIsOpen ? "visible" : "invisible"}>

        <UploadsList
          renderFooter={(u) => {
            return (
              <button onClick={() => {

                const data = JSON.stringify({
                  size: 1,
                  frame: 1,
                  position: 1,
                  url: `/static_content/uploads/van-gogh-1.jpg`
                });
      
                console.log("SENDING DATA", {data})
                currentUnityContext.unityInstance.SendMessage("GameController", "ArtJson", data)
      
              }}>Upload</button>
            )
          }}
        />

      </div>


    </div>
  );
};

export default UnityControls;
