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

const dummyInspectedImage = { 
  inspectedImage: { 
    size: 1, 
    frame: 1, 
    position: 1,
    texture: 1, 
    url: "null", 
    inspectType: "unity-inspect"
  }
}

const UnityInspectControls = ({unityContext}) => {

  const { galleryId } = useParams();

  const [option, setOption] = useState();
  const [contentListIsVisible, setContentListIsVisible] = useState(false) 
  const [fileUploadIsVisible, setFileUploadIsVisible] = useState(false) 

  const { inspectedImage } = dummyInspectedImage;
  const { paused } = useUnityPause();

  const { 
    uploadArt, 
    loadLargeObject, 
    loadSmallObject, 
    deleteArtAtPosition, 
    deleteLargeObjectAtPosition,
    deleteSmallObjectAtPosition,
  } = useUnitySendMessage(unityContext)

  const uploadArtMap = {
    [inspectTypes.unityInspect]: uploadArt,
    [inspectTypes.unityLargeInspect]: loadLargeObject,
    [inspectTypes.unitySmallInspect]: loadSmallObject,
  }

  const deleteArtMap = {
    [inspectTypes.unityInspect]: deleteArtAtPosition,
    [inspectTypes.unityLargeInspect]: deleteLargeObjectAtPosition,
    [inspectTypes.unitySmallInspect]: deleteSmallObjectAtPosition,
  }

  const showImageOptions = useCallback(() => setOption(options.imageOptions), [])
  const showFrameOptions = useCallback(() => setOption(options.frameOptions), [])
  const showSizeOptions = useCallback(() => setOption(options.sizeOptions), [])
  
  const showContentList = useCallback(() => setContentListIsVisible(true), [])
  const hideContentList = useCallback(() => setContentListIsVisible(false), [])

  const showFileUpload = useCallback(() => setFileUploadIsVisible(true), [])
  const hideFileUpload = useCallback(() => setFileUploadIsVisible(false), [])
  
  const handleFileUploadSuccess = useCallback(() => {
    hideFileUpload();
    showContentList();
  }, [hideFileUpload, showContentList]);

  const handleContentSelect = (fileItem) => {
    const { size, frame, position, texture, inspectType } = inspectedImage;
    const galleryFiles = {
      inspectType,
      galleryId,
      fileId: fileItem.id,
      galleryFiles: [
        { id: -1, ...inspectedImage }
      ]
    }

    post('/save_gallery_files', galleryFiles)
    .then(() => {
      const url = `${serverHostname}${fileItem.path}`;
      switch(inspectType) {
        case inspectTypes.unityInspect:
          return uploadArtMap[inspectTypes.unityInspect](size, frame, position, url);
        case inspectTypes.loadLargeObject:
          return uploadArtMap[inspectTypes.loadLargeObject](position, texture, url);
        case inspectTypes.loadSmallObject:
          return uploadArtMap[inspectTypes.loadSmallObject](position, texture, url);
        default:
          return;
      }
    })
  }

  const handleRemoveContentAtPosition = () => {
    const { position } = inspectedImage;
    const { inspectType } = inspectedImage;
    const _delete = deleteArtMap[inspectType]
    _delete(position);
  }

  const clearUI = useCallback(() => {
    setOption();
    setContentListIsVisible(false)
  }, [])

  const ClearUIButton = () => (
    <button class="back-button" onClick={clearUI}>
      <ArrowBackOutlined/>
    </button>
  )

  const fileExists = useMemo(() => !isEmpty(inspectedImage.url), [inspectedImage] );
  const showType = useMemo(() => {
    const { inspectType } = inspectedImage;
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

    case options.imageOptions:
      return (
        <div id="unity-inspect-controls">

          { contentListIsVisible && 
            <ContentListModal 
              showType={showType}
              handleCancel={hideContentList}
              handleContentSelect={handleContentSelect}
            />
          }

          { fileUploadIsVisible && 
            <FileUploadModal
              handleCancel={hideFileUpload}
              handleUploadSuccess={handleFileUploadSuccess}
            />
          }

          <ClearUIButton/>
          <button onClick={showContentList}>Choose Existing Content</button>
          <button onClick={showFileUpload}>Upload New</button>
        </div>
      );

    case options.frameOptions:
      return (
        <div id="unity-inspect-controls">
          <ClearUIButton/>
          <button>Brown</button>
          <button>White</button>
          <button>Black</button>
        </div>
      );

    case options.sizeOptions:
      return (
        <div id="unity-inspect-controls">
          <ClearUIButton/>
          <button>Square</button>
          <button>Portrait</button>
          <button>Landscape</button>
        </div>
      );
  

    default:
      return (
        <div id="unity-inspect-controls">

          <button onClick={showImageOptions}>
            {fileExists ? "Change" : "Add"} Image
          </button>
          
          <button onClick={showSizeOptions} disabled={!fileExists}>
            Change Image Frame
          </button>

          <button onClick={showFrameOptions} disabled={!fileExists}>
            Change Image Size
          </button>
          
          <button onClick={handleRemoveContentAtPosition} disabled={!fileExists}>
            Remove Image
          </button>

        </div>
      );
  }
};

export default UnityInspectControls;
