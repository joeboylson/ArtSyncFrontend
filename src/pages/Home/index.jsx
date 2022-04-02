import PageWrapper from "../../components/PageWrapper";
import NewGalleryButton from "../../layouts/NewGalleryButton";
import GalleriesList from "../../layouts/GalleriesList";
import { useMemo, useEffect } from "react";
import { useUserGalleries } from "../../hooks/useUserGalleries";
import { formatAPIGalleries } from "../../utils/gallery";

import "./style.scss";

const Home = () => {

  const { loading: useUserGalleriesLoading, userGalleries } = useUserGalleries()
  const isLoading = useMemo(() => useUserGalleriesLoading, [useUserGalleriesLoading]);

  const galleries = formatAPIGalleries(userGalleries);

  return (
    <PageWrapper>
      <div id="home">
        <h1>My Galleries</h1>
        <GalleriesList galleries={galleries} skeleton={isLoading}/>
        <NewGalleryButton/>
      </div>
    </PageWrapper>
  );
};

export default Home;
