import { useCallback, useEffect, useState } from "react"
import { inspectTypes } from "../constants/inspectType";

export const useUnityInspect = () => {

  const [inspectedImage, setInspectedImage] = useState(null);

  const overrideInspectedImage = useCallback((rawInspectString) => {
    setInspectedImage({
      detail: rawInspectString,
      inspectType: inspectedImage?.inspectType
    })
  }, [inspectedImage])

  useEffect(() => {
    window.addEventListener('unity-inspect', ({detail}) => setInspectedImage({
      detail, 
      inspectType: inspectTypes.unityInspect
    }));

    window.addEventListener('unity-large-inspect', ({detail}) => setInspectedImage({
      detail, 
      inspectType: inspectTypes.unityLargeInspect 
    }));

    window.addEventListener('unity-small-inspect', ({detail}) => setInspectedImage({
      detail,
      inspectType: inspectTypes.unitySmallInspect,
    }));

    window.addEventListener('unity-empty-inspect', ({detail}) => setInspectedImage({
      detail, 
      inspectType: inspectTypes.unityEmptyInspect
    }));

    window.addEventListener('unity-empty-large-inspect', ({detail}) => setInspectedImage({
      detail, 
      inspectType: inspectTypes.unityLargeInspect 
    }));

    window.addEventListener('unity-empty-small-inspect', ({detail}) => setInspectedImage({
      detail,
      inspectType: inspectTypes.unitySmallInspect,
    }));

    window.addEventListener('unity-uninspect', () => setInspectedImage(null));
  }, [])

  return { inspectedImage, overrideInspectedImage }
}