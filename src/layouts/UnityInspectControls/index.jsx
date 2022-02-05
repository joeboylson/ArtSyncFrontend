import { useMemo } from "react";
import { isEmpty } from "lodash";
import { useUnityInspect } from "../../hooks/useUnityInspect";
import { useUploads } from "../../hooks/useUploads";

const UnityInspectControls = ({ currentUnityContext }) => {

  const { inspectedImage } = useUnityInspect();
  const { uploads } = useUploads();

  const [ size, frame, position, url ] = useMemo(() => {
    if (!inspectedImage) return [null, null, null, null]
    return inspectedImage.split(",")
  }, [inspectedImage]) 

  const handleUploadOverlayClick = (upload) => {
    const data = `1,1,1,/${upload}`;
    currentUnityContext.unityInstance.SendMessage("GameController", "ArtJson", data)
  }

  if ( isEmpty(currentUnityContext) ||  isEmpty(inspectedImage) ) return null;

  return (
    <div id="unity-inspect-controls">

      <div>
        <p>SIZE: {size}</p>
        <p>FRAME: {frame}</p>
        <p>POSITION: {position}</p>
        <p>URL: {url}</p>
      </div>

      <div id="image-upload-controls">
        { uploads && uploads.map(u => {

          const url = u.replace(/\\/g, "/");
          
          return (
            <button 
              onClick={() => handleUploadOverlayClick(url)}
              style={{ "--background-image": `url("/${url}")` }}
            >Upload</button>
          )
        } 
        )}
      </div>
    </div>
  );
};

export default UnityInspectControls;
