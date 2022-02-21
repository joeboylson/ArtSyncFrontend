import Loading from "../../components/Loading";
import { useUploads } from "../../hooks/useUploads";

import "./style.scss";

const UploadsList = ({ renderFooter }) => {
  const { loading, uploads } = useUploads();

  console.log({uploads})

  return (
    <Loading loading={loading}>
      <div className="uploads-list">
        {uploads &&
          uploads.map((upload, i) => {
            return (
                <div className="uploads-item" key={i}>
                    <img src={`${upload.path}`} alt={upload.path}/>
                    { renderFooter && renderFooter(upload) }
                </div>
            )
          })}
      </div>
    </Loading>
  );
};

export default UploadsList;
