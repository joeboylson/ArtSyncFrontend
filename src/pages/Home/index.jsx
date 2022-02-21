import FileUpload from "../../components/FileUpload";
import UploadsList from "../../layouts/UploadsList";
import PageWrapper from "../../components/PageWrapper";
import UserGalleriesList from "../../layouts/UserGalleriesList";
import { useUploads } from "../../hooks/useUploads";
import { notifySuccess } from "../../utils/notification";

import "./style.scss";

const Home = () => {
  const { refetchUploadsEvent } = useUploads();

  return (
    <PageWrapper>

      <div id="home">
        <div id="scenes-list-wrapper">
          <h3>My Galleries</h3>
          <UserGalleriesList />
        </div>

        <div id="upload-images-wrapper">
          <FileUpload
            afterUpload={() => window.dispatchEvent(refetchUploadsEvent)}
          />
          <UploadsList />
        </div>
      </div>

      <button onClick={() => notifySuccess("message", "title", 3000) } >NOTIFY TEST</button>

    </PageWrapper>
  );
  
};

export default Home;
