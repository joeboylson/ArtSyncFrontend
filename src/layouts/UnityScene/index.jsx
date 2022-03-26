import Unity, { UnityContext } from "react-unity-webgl";
import { useWindowSize } from "../../hooks/useWindowSize";

import "./style.scss";

const UnityScene = ({ scene, onLoad }) => {

  const { width, height } = useWindowSize();
  const unityContext = new UnityContext( JSON.parse(scene.context_string) );

  unityContext.on("loaded", () => onLoad(unityContext))

  return (
    <Unity
      id="unity-scene"
      unityContext={unityContext}
      style={{ 
        width: width - 50, 
        height: height - 50 
      }}
    />
  );
};

export default UnityScene;
