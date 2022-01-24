import Unity, { UnityContext } from "react-unity-webgl";
import { useWindowSize } from "../../hooks/useWindowSize";

const UnityScene = ({ currentScene, onLoad }) => {

  const { width, height } = useWindowSize()

  console.log(width, height)
  
  const unityContext = new UnityContext(currentScene.context);
  unityContext.on("loaded", () => onLoad(unityContext));

  return (
    <Unity
      unityContext={unityContext}
      onLoad={() => console.log("ON LOAD")}
      style={{ 
        width: width - 1, 
        height: height - 5 
      }}
    />
  );
};

export default UnityScene;
