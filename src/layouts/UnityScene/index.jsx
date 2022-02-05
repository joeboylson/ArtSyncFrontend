import Unity, { UnityContext } from "react-unity-webgl";
import { useWindowSize } from "../../hooks/useWindowSize";

const UnityScene = ({ scene, onLoad }) => {

  const { width, height } = useWindowSize();
  const unityContext = new UnityContext( JSON.parse(scene.context_string) );

  console.log(unityContext)

  unityContext.on("loaded", () => onLoad(unityContext))

  return (
    <Unity
      unityContext={unityContext}
      onLoad={() => console.log("LOADED")}
      style={{ 
        width: width - 1, 
        height: height - 5 
      }}
    />
  );
};

export default UnityScene;
