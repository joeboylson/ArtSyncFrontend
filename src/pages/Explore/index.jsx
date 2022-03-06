import Loading from "../../components/Loading";
import PageWrapper from "../../components/PageWrapper";
import GalleriesList from "../../layouts/GalleriesList";
import { useMemo } from "react";
import { useExploreGalleries } from "../../hooks/useExploreGalleries";
import { shuffle } from "lodash";
import { formatAPIGalleries } from "../../utils/gallery";

import "./style.scss";

const Explore = () => {

  const { loading: useExploreGalleriesLoading, exploreGalleries } = useExploreGalleries();
  const isLoading = useMemo(() => useExploreGalleriesLoading, [useExploreGalleriesLoading]);

  const galleries = shuffle(formatAPIGalleries(exploreGalleries));

  return (
    <PageWrapper>
      <div id="explore">
        <h1>Explore Galleries</h1>
        <GalleriesList galleries={galleries} skeleton={isLoading}/>
      </div>
    </PageWrapper>
  );
};

export default Explore;
