import PageWrapper from "../../components/PageWrapper";
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import UserGalleries from "../../layouts/UserGalleries";
import { useMemo } from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import { useGalleryById } from '../../hooks/useGalleryById';
import { useProfile } from '../../hooks/useProfile';
import { notifyWarning } from "../../utils/notification";
import { isEmpty } from "lodash";

import './style.scss'

const Gallery = () => {

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

  const otherGalleriesUserId = useMemo(() => (
    (viewerIsOwner && !isEmpty(owner)) ? null : owner?.user_id
  ), [owner, viewerIsOwner]);

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
              <Link to={`/gallery/view/${galleryId}`} className="open-gallery-link">
                <h2>Start</h2>
              </Link>
            </div>

            { otherGalleriesUserId && 
              <div id="gallery-information">
                <div style={{border: "1px solid black"}}></div>
                <div id="gallery-list-wrapper">
                  <p>Other galleries by this creator:</p>
                  <UserGalleries userId={otherGalleriesUserId}/>
                </div>
              </div>
            }
          </div>
        }
      </Loading>
    </PageWrapper>
  );
};

export default Gallery;