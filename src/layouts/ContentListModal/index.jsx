import { useEffect } from "react";
import FileGrid from "../../components/FileGrid";
import Loading from "../../components/Loading";
import { useModalContext } from "../../context/ModalContext";
import { useUploads } from "../../hooks/useUploads";
import { sortUploads } from "../../utils/uploads";

import "./style.scss";

const ContentListModal = ({
  handleContentSelect,
  handleCancel,
  showType
}) => {

  const { uploads, loading } = useUploads();

  const { imageUploads, objects3dUploads, musicUploads } = sortUploads(uploads);

  const handleClickAway = (e) => {
    if (e.target.dataset.clickAway === "true") {
      handleCancel()
    }
  }

  return (
    <div 
      className="file-upload-modal"
      onClick={handleClickAway}
      data-click-away={true}
    >
      <div className="file-upload-modal-content">
        <h3>My Content</h3>

        <Loading loading={loading}>
          { (!showType || (showType && showType === "image")) &&
            <FileGrid 
              files={imageUploads} 
              skeleton={false}
              onSelectFileItem={handleContentSelect}
            />
          }

          { (!showType || (showType && showType === "objects3d")) &&
            <FileGrid 
              files={objects3dUploads} 
              skeleton={false}
              onSelectFileItem={handleContentSelect}
            />
          }

          { (!showType || (showType && showType === "music")) &&
            <FileGrid 
              files={musicUploads} 
              skeleton={false}
              onSelectFileItem={handleContentSelect}
            />
          }
        </Loading>
        
      </div>
    </div>
  );
};

export default ContentListModal;
