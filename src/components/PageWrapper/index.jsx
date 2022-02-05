import React from "react";
import axios from "axios";
import Loading from "../Loading";
import { useProfile } from "../../hooks/useProfile";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./style.scss";

const PageWrapper = ({ children }) => {
  const { push } = useHistory();
  const { profile, loading } = useProfile();

  const logout = () => {
    axios.get("/logout").then((data) => {
      console.log({ data });
      push("/login");
    });
  };

  return (
    <div id="page-wrapper">
      <Loading loading={loading}>
        <div id="profile-header">
          <p>Welcome, {profile && profile.name}</p>
          <button onClick={logout}>Logout</button>

          <Link to="/home">Home</Link>
          <Link to="/gallery/new">New Gallery</Link>
          <Link to="/preview/1">Test Scene</Link>
        </div>
        {children}
      </Loading>
    </div>
  );
};

export default PageWrapper;
