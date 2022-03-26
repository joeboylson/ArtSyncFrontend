import { Skeleton } from "@material-ui/lab";
import FileItem from "../FileItem";

import "./style.scss"

const _doNothing = () => { return; }
const FileItemSkeleton = () => <Skeleton variant="rect"/>
const FileItemRender = (fileItem, onSelectFileItem) => (
  <FileItem 
    fileItem={fileItem}
    onSelectFileItem={onSelectFileItem}
  />
)


const FileGrid = ({
  files=[], 
  skeleton=true,
  onSelectFileItem=_doNothing
}) => {

  const items = skeleton ? 
    Array(10).fill(FileItemSkeleton()) :
    files.map(fileItem => FileItemRender(fileItem, onSelectFileItem))

  return (
    <div className="file-grid">
      {items.map(component => (component))}
    </div>
  );
};

export default FileGrid;
