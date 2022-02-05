import { useEffect, useState } from "react"

export const useUnityInspect = () => {

  const [inspectedImage, setInspectedImage] = useState(null);

  const inspectEvent = new CustomEvent('unity-inspect', {detail: "Any Object Here"});
  const uninspectEvent = new CustomEvent('unity-uninspect');

  const inspectCallback = ({detail}) => setInspectedImage(detail);
  const uninspectCallback = () => setInspectedImage(null);

  useEffect(() => {
    window.addEventListener('unity-inspect', inspectCallback);
    window.addEventListener('unity-large-inspect', inspectCallback);
    window.addEventListener('unity-small-inspect', inspectCallback);

    window.addEventListener('unity-empty-inspect', inspectCallback);
    window.addEventListener('unity-uninspect', uninspectCallback);
    
  }, [])

  return { inspectedImage, inspectEvent, uninspectEvent }
}