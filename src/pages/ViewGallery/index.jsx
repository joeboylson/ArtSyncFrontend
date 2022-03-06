import PageWrapper from "../../components/PageWrapper";
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import GalleriesList from "../../layouts/GalleriesList";
import { useMemo } from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import { useGalleryById } from '../../hooks/useGalleryById';
import { useProfile } from '../../hooks/useProfile';
import { notifyWarning } from "../../utils/notification";
import { isEmpty } from "lodash";
import { useUserGalleries } from "../../hooks/useUserGalleries";

import './style.scss'
import { formatAPIGalleries } from "../../utils/gallery";

const ViewGallery = () => {

  const { galleryId } = useParams();
  const { loading: galleryLoading, gallery, queryHasRun } = useGalleryById(galleryId);
  const { loading: profileLoading, profile: viewer } = useProfile()

  const owner = useMemo(() => {
    if (!gallery) return null;
    return gallery.user_galleries.find(u => u.user_is_owner)
  }, [gallery]);

  const viewerIsOwner = useMemo(() => {
    if (!owner || !viewer) return false;
    return owner.user_id === viewer.id
  }, [owner, viewer]);


  const {loading: useGalleryByIdLoading, userGalleries } = useUserGalleries(
    (viewerIsOwner && !isEmpty(owner)) ? null : owner?.user_id,
    true
  )
  
  const filteredOtherUserGalleries = useMemo(() => {
    if (!userGalleries) return [];
    return userGalleries.filter(g => {
      const [_, gallery] = g;
      return gallery.id !== Number(galleryId); 
    })
  }, [galleryId, userGalleries])

  const name = useMemo(() => {
    if (!gallery) return "";
    return gallery.name;
  }, [gallery]);

  const galleryEditLink = useMemo(() => {
    if (!viewerIsOwner) return null;
    return `/gallery/edit/${galleryId}`;
  }, [galleryId, viewerIsOwner]);

  const isLoading = (!queryHasRun || galleryLoading || profileLoading);

  // handle where gallery is not found
  if (!galleryLoading && !gallery && queryHasRun) {
    notifyWarning(
      `This gallery does not exist or it has not been made public`,
      `Gallery Was Not Found`
    );
    return <Redirect to="/"/>
  };

  console.log(filteredOtherUserGalleries)

  return (
    <PageWrapper>
      <Loading loading={isLoading}>
        { gallery && 
          <div id="view-gallery">
            <div id="view-gallery-header">
              <BackButton/>
              <h1>{name}</h1>
              { viewerIsOwner && <Link to={galleryEditLink}>Edit</Link>}
            </div>

            <div 
              style={{"--gallery-thumbnail": `url(${gallery.thumbnail})`}}
              id="gallery-cover" 
            >
              <button className="open-gallery-button">
                <h2>Start</h2>
              </button>
            </div>

            { !viewerIsOwner && 
              <div id="gallery-information">
                <div style={{border: "1px solid black"}}></div>
                <div id="gallery-list-wrapper">
                  <p>Other galleries by this creator:</p>
                  <GalleriesList
                    skeleton={useGalleryByIdLoading}
                    galleries={formatAPIGalleries(filteredOtherUserGalleries)}
                  />
                </div>
              </div>
            }
          </div>
        }
      </Loading>
    </PageWrapper>
  );
};

export default ViewGallery;