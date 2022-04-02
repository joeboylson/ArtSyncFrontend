import FileGrid from "../../components/FileGrid";
import PageWrapper from "../../components/PageWrapper";
import FileUploadModal from "../../layouts/FileUploadModal";
import { useCallback, useMemo, useState } from "react";
import { useUploads } from "../../hooks/useUploads";
import { sortUploads } from "../../utils/uploads";

import "./style.scss";

const Content = () => {

  const { uploads, loading, refetch } = useUploads();
  const { imageUploads, objects3dUploads, musicUploads } = sortUploads(uploads);

  const [contentFilter, setContentFilter] = useState();
  const [uploadModalFileType, setUploadModalFileType] = useState();

  const handleUploadSuccess = () => {
    refetch();
    setUploadModalFileType();
  }

  const handleCancel = () => setUploadModalFileType();

  const contentFilterIsBlank = useMemo(() => !contentFilter, [contentFilter]);

  const hideImages = useMemo(() => (
    !contentFilterIsBlank && contentFilter !== "image"), 
    [contentFilter, contentFilterIsBlank]
  );

  const hide3DObjects = useMemo(() => (
    !contentFilterIsBlank && contentFilter !== "objects3d"), 
    [contentFilter, contentFilterIsBlank]
  );

  const hideMusic = useMemo(() => (
    !contentFilterIsBlank && contentFilter !== "music"), 
    [contentFilter, contentFilterIsBlank]
  );

  const removeFilter = useCallback(() => setContentFilter(), []);
  const filterImages = useCallback(() => setContentFilter("image"), []);
  const filter3DObjects = useCallback(() => setContentFilter("objects3d"), []);
  const filterMusic = useCallback(() => setContentFilter("music"), []);
  const setImagesFileType = useCallback(() => setUploadModalFileType("image"), []);
  const set3DObjectsFileType = useCallback(() => setUploadModalFileType("objects3d"), []);
  const setMusicFileType = useCallback(() => setUploadModalFileType("music"), []);

  const modalIsOpen = useMemo(() => !!uploadModalFileType, [uploadModalFileType]);

  return (
    <PageWrapper>
      <div id="content">
        <h1>Content</h1>

        <div id="content-filter-wrapper">
          <button className={contentFilter === undefined ? "active" : ""} onClick={removeFilter}>All</button>
          <button className={contentFilter === "image" ? "active" : ""} onClick={filterImages}>Images</button>
          <button className={contentFilter === "objects3d" ? "active" : ""} onClick={filter3DObjects}>3D Objects</button>
          <button className={contentFilter === "music" ? "active" : ""} onClick={filterMusic}>Music</button>
        </div>

        <div id="file-grids-wrapper">
          
          { !hideImages && 
            <div className="file-grid-wrapper">
              <div className="grid-header">
                <h3>Images</h3>
                <button onClick={setImagesFileType}>Upload New Image</button>
              </div>
              <FileGrid files={imageUploads} skeleton={loading}/>
            </div>
          }
          
          { !hide3DObjects && 
            <div className="file-grid-wrapper">
              <div className="grid-header">
                  <h3>3D Objects</h3>
                <button onClick={set3DObjectsFileType}>Upload New 3D Object</button>
              </div>
              <FileGrid files={objects3dUploads} skeleton={loading}/>
            </div>
          }

          { !hideMusic && 
            <div className="file-grid-wrapper">
              <div className="grid-header">
                <h3>Music</h3>
                <button onClick={setMusicFileType}>Upload New Song</button>
              </div>
              <FileGrid files={musicUploads} skeleton={loading}/>
            </div>
          }

          { modalIsOpen && 
            <FileUploadModal 
              type={uploadModalFileType}
              handleUploadSuccess={handleUploadSuccess}
              handleCancel={handleCancel}
            />
          }

        </div>

      </div>
    </PageWrapper>
  );
};

export default Content;
