import { filenameFromPath } from "../../utils/uploads";

import "./style.scss"

const FileItem = ({fileItem, onSelectFileItem}) => {
  const { path } = fileItem;
  const filename = filenameFromPath(path)

  if (onSelectFileItem) {
    const onClick = () => onSelectFileItem(fileItem);
    return (
      <button 
        onClick={onClick}
        className="file-item"
      >
        { filename }
      </button>
    )
  }

  return <p className="file-item">{ filename }</p>;
};

export default FileItem;
