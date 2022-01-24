import React, { useRef } from 'react';
import axios from 'axios';
import { uniqueId } from 'lodash';

import './style.scss';

const FileUpload = ({afterUpload}) => {

  const inputRef = useRef(null);

  const handleUploadSuccess = (data) => {
    console.log('SUCCESS', data)
    afterUpload && afterUpload(data);
    inputRef.current.value = null;
  }

  const uploadFile = () => {

    if (!inputRef.current) return;

    const file = inputRef.current.files[0];
    if (!file) return console.log("NO FILE")

    const formData = new FormData();
    const headers = { 'Content-Type': 'multipart/form-data' }

    const _file = new File([file], `${uniqueId()}-${file.name}`);

    formData.append("file", _file);
    axios.post('/static_content/upload', formData, {headers})
    .then(handleUploadSuccess)
    .catch(error => console.log('ERROR', error));
  }

  return (
    <div className="file-upload">
      <h3>Upload an Image:</h3>

      <div className="inputs-wrapper">
        <input 
          type="file" 
          name="file" 
          ref={inputRef}
          />

        <button onClick={uploadFile}>SUBMIT</button>
      </div>
    </div>
  );
}

export default FileUpload;