import ContentListModal from '../ContentListModal';
import FileUploadModal from '../FileUploadModal';
import { useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash"
import { useUnityInspect } from "../../hooks/useUnityInspect";
import { useUploads } from "../../hooks/useUploads";
import { useUnitySendMessage } from "../../hooks/useUnitySendMessage";
import { useUnityPause } from "../../hooks/useUnityPause";
import { options } from "../../constants/controlOptions";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import { post } from 'axios';
import { serverHostname } from '../../utils/env';
import { inspectTypes } from '../../constants/inspectType';

import "./style.scss";

const UnityInspectControls = ({unityContext}) => {

  const [ option, setOption ] = useState();
  const [ contentListIsVisible, setContentListIsVisible ] = useState(false) 
  const { inspectedImage: inspectImageRaw, overrideInspectedImage } = useUnityInspect();
  const { paused } = useUnityPause();

  const inspectedImage = useMemo(() => {
    const inspectImageParams = inspectImageRaw?.detail?.split(",")
    const inspectType = inspectImageRaw?.inspectType

    if (inspectImageParams?.length === 4) {
      const [ size, frame, position, url ] = inspectImageParams;
      return {
        size,
        frame, 
        position,
        url, 
        texture: null, 
        inspectType: "unity-inspect"
      }
    }

    if (inspectImageParams?.length === 3) {
      const _inspectType = inspectType === "unity-empty-inspect" ? "unity-small-inspect" : "unity-large-inspect"
      const [ position, texture, url ] = inspectImageParams;
      return {
        size: null,
        frame: null, 
        position,
        url, 
        texture,
        inspectType: _inspectType
      }
    }

    return {
      size: null, 
      frame: null, 
      position: null, 
      texture: null, 
      inspectType: null
    }

  }, [inspectImageRaw])

  const showFrameOptions = useCallback(() => setOption(options.frameOptions), [])
  const showSizeOptions = useCallback(() => setOption(options.sizeOptions), [])
  
  const showContentList = useCallback(() => setContentListIsVisible(true), [])
  const hideContentList = useCallback(() => setContentListIsVisible(false), [])

  const clearUI = useCallback(() => {
    setOption();
    setContentListIsVisible(false)
  }, [])

  const handleContentSelect = useCallback((selectedContent) => {
    const { position, size, frame } = inspectedImage;
    const { path: url } = selectedContent
    const outputString = `${size},${frame},${position},http://localhost:5000${url}`
    unityContext.send("GameController", "ArtJson", outputString);
    overrideInspectedImage(outputString)
    clearUI()
  }, [inspectedImage, unityContext, clearUI, overrideInspectedImage])

  const handleRemoveContentAtPosition = useCallback(() => {
    const { position, size, frame } = inspectedImage;
    const outputString = `${size},${frame},${position},http://localhost:5000/static_content/uploads/glare.png`
    unityContext.send("GameController", "ArtJson", outputString);
    overrideInspectedImage(outputString)
  }, [inspectedImage, unityContext, overrideInspectedImage])

  const ClearUIButton = () => (
    <button class="back-button" onClick={clearUI}>
      <ArrowBackOutlined/>
    </button>
  );

  const changeCurrentFrame = useCallback((frame) => {
    try {
      if (!inspectedImage || !unityContext) return;
      const {size, position, url} = inspectedImage;
      const outputString = `${size},${frame},${position},${url}`
      unityContext.send("GameController", "ArtJson", outputString);
      overrideInspectedImage(outputString)
    } catch(error) {
      console.log("[changeCurrentFrame] error --", error)
    }
  }, [unityContext, inspectedImage, overrideInspectedImage])

  const changeCurrentSize = useCallback((size) => {
    try {
      if (!inspectedImage || !unityContext) return;
      const {frame, position, url} = inspectedImage;
      const outputString = `${size},${frame},${position},${url}`
      unityContext.send("GameController", "ArtJson", outputString);
      overrideInspectedImage(outputString)
    } catch(error) {
      console.log("[changeCurrentFrame] error --", error)
    }
  }, [unityContext, inspectedImage, overrideInspectedImage])

  const fileExists = useMemo(() => !isEmpty(inspectedImage?.url), [inspectedImage] );
  
  const showType = useMemo(() => {
    const inspectType = inspectedImage?.inspectType;
    switch(inspectType) {
      case inspectTypes.unityInspect:
        return "image";
      case inspectTypes.loadLargeObject:
        return "objects3d";
      case inspectTypes.loadSmallObject:
        return "objects3d";
      default:
        return;
    }
  }, [inspectedImage])

  if (paused) return null;

  switch (option) {

    case options.frameOptions:
      return (
        <div id="unity-inspect-controls">
          <ClearUIButton/>
          <button onClick={() => changeCurrentFrame(0)}>Brown</button>
          <button onClick={() => changeCurrentFrame(1)}>White</button>
          <button onClick={() => changeCurrentFrame(2)}>Black</button>
        </div>
      );

    case options.sizeOptions:
      return (
        <div id="unity-inspect-controls">
          <ClearUIButton/>
          <button onClick={() => changeCurrentSize(0)}>Square</button>
          <button onClick={() => changeCurrentSize(1)}>Portrait</button>
          <button onClick={() => changeCurrentSize(2)}>Landscape</button>
        </div>
      );
  

    default:
      return (
        fileExists && <div id="unity-inspect-controls">

          { contentListIsVisible && 
            <ContentListModal 
              showType={showType}
              handleCancel={hideContentList}
              handleContentSelect={handleContentSelect}
            />
          }

          <button onClick={showContentList}>
            {fileExists ? "Change" : "Add"} Image
          </button>
          
          <button onClick={showSizeOptions} disabled={!fileExists}>
            Change Image Size
          </button>

          <button onClick={showFrameOptions} disabled={!fileExists}>
            Change Image Frame
          </button>
          
          <button onClick={handleRemoveContentAtPosition} disabled={!fileExists}>
            Remove Image
          </button>
        </div>
      );
  }
};

export default UnityInspectControls;
