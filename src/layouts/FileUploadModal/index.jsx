import { post } from "axios";
import { uniqueId } from "lodash";
import { useMemo, useRef, useState, useEffect } from "react";
import { notifySuccess, notifyError } from "../../utils/notification";
import { useModalContext } from "../../context/ModalContext";

import "./style.scss";

const FileUploadModal = ({
  type, 
  handleUploadSuccess,
  handleCancel
}) => {


  const { setModalIsOpen } = useModalContext();
  
  useEffect(() => {
    setModalIsOpen(true)
  }, [setModalIsOpen])

  const [fileType, setFileType] = useState(type)
  const [file, setFile] = useState()

  const fileUploadRef = useRef()

  const uploadFile = () => {
    try {
      const uploadedFile = fileUploadRef.current.files[0];
      if (!uploadedFile) return console.log("NO FILE")
  
      const formData = new FormData();
      const headers = { 'Content-Type': 'multipart/form-data' }
  
      const _file = new File([file], `${uniqueId()}-${uploadedFile.name}`);
      formData.append("file", _file);
      formData.append("fileType", fileType);

      post('/static_content/upload', formData, { headers })
      .then(({data}) => {
        if (data.filename) {
          notifySuccess("Success!")
          handleUploadSuccess(data)
        } else {
          notifyError("Upload Failed")
        }
      })
      .catch(error => console.log('ERROR', error));

    } catch {
      console.log("ERROR UPLOADING FILE")
    }
  }

  const getHandler = (callback) => {
    return function(e) { callback(e.target.value) }
  }

  const handleClickAway = (e) => {
    if (e.target.dataset.clickAway === "true") {
      handleCancel()
    }
  }

  const submitButtonIsDisabled = useMemo(() => {
    return !fileType || !file
  }, [fileType, file]);

  return (
    <div 
      className="file-upload-modal"
      onClick={handleClickAway}
      data-click-away={true}
    >
      <div className="file-upload-modal-content">
        
        <h3>Upload a File</h3>

        <select name="" id=""onChange={getHandler(setFileType)} defaultValue={type}>
          <option value="image">Image File (.jpg, .png)</option>
          <option value="objects3d">3D Object (.obj)</option>
          <option value="music">Music (.mp3)</option>
        </select>

        <input ref={fileUploadRef} type="file" onChange={getHandler(setFile)}/>

        <button 
          onClick={uploadFile} 
          className={submitButtonIsDisabled ? "disabled" : ""}
        >Upload</button>

      </div>
    </div>
  );
};

export default FileUploadModal;
