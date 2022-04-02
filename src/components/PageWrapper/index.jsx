import ProfileButton from '../../layouts/ProfileButton';

import { useMemo } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, PublicOutlined, CollectionsOutlined } from "@material-ui/icons";

import "./style.scss";

const PageWrapper = ({ children, hideNav, centerContent }) => {

  const isHomeRoute = useMemo(() => {
    const _isHome = window.location.pathname === "/";
    const _isGalleryNew = window.location.pathname === "/gallery/new";
    return _isHome || _isGalleryNew;
  }, []);
  const isExploreRoute = useMemo(() => window.location.pathname.includes("explore"), []);
  const isContentRoute = useMemo(() => window.location.pathname.includes("content"), []);

  const pageWrapperClass = useMemo(() => {
    const classNames = []

    if (hideNav) classNames.push("hide-nav")
    if (centerContent) classNames.push("center-content");

    return classNames.join(" ");
  }, [hideNav, centerContent])

  return (
    <div id="page-wrapper" className={pageWrapperClass}>
        
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
