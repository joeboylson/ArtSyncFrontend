import ProfileButton from '../../layouts/ProfileButton';

import { useMemo } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, PublicOutlined, CollectionsOutlined } from "@material-ui/icons";

import "./style.scss";

const PageWrapper = ({ children, hideNav }) => {

  const isHomeRoute = useMemo(() => {
    const _isHome = window.location.pathname === "/";
    const _isGalleryNew = window.location.pathname === "/gallery/new";
    return _isHome || _isGalleryNew;
  }, []);
  const isExploreRoute = useMemo(() => window.location.pathname.includes("explore"), []);
  const isContentRoute = useMemo(() => window.location.pathname.includes("content"), []);

  return (
    <div id="page-wrapper">
        
        { !hideNav && 
          <nav>
            <div id="nav-inner">
              <span id="logo"></span>

              <div id="links">
                <Link className={isHomeRoute ? "active" : ""} to="/">
                  <HomeOutlined/>
                </Link>

                <Link className={isExploreRoute ? "active" : ""} to="/explore">
                  <PublicOutlined/>
                </Link>
                
                <Link className={isContentRoute ? "active" : ""} to="/content">
                  <CollectionsOutlined/>
                </Link>
              </div>

              <ProfileButton />

            </div>
          </nav>
        }
        
        <div id="page-content">
          {children}
        </div>
    </div>
  );
};

export default PageWrapper;
