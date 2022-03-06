import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddEditGallery from "../pages/AddEditGallery";
import ProtectedRoute from "../layouts/ProtectedRoute";
import PageWrapper from "../components/PageWrapper";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import "./style.scss";
import Explore from "../pages/Explore";
import ViewGallery from "../pages/ViewGallery";
import Content from "../pages/Content";

const App = () => {
  return (
    <Router>
      <main>
        
        <Switch>
          <Route exact path={["/login"]}>
            <Login />
          </Route>

          <Route exact path={["/register"]}>
            <Register />
          </Route>

          {/* GALLERY ROUTES */}
          <Route exact path={["/gallery/new", "/gallery/edit/:galleryId"]}>
            <ProtectedRoute>
              <AddEditGallery/>
            </ProtectedRoute>
          </Route>

          <Route exact path={["/gallery/:galleryId"]}>
            <ProtectedRoute>
              <ViewGallery/>
            </ProtectedRoute>
          </Route>

          {/* EXPLORE ROUTES */}

          <Route exact path={["/explore"]}>
            <ProtectedRoute>
              <Explore/>
            </ProtectedRoute>
          </Route>

          <Route exact path={["/explore/gallery/:galleryId"]}>
            <ProtectedRoute>
              <PageWrapper>
                <Link to="/explore">{`< Back`}</Link>
                <p>explore gallery :galleryId</p>
                <p>(user does not own this - just gallery without controls)</p>
              </PageWrapper>
            </ProtectedRoute>
          </Route>

          <Route exact path={["/profile/:userId"]}>
            <ProtectedRoute>
              <PageWrapper>
                <Link to="/explore">{`< Back`}</Link>
                <p>explore profile :userId</p>
                <ul>
                  <li>Show user details</li>
                  <li>Show all user galleries</li>
                </ul>
              </PageWrapper>
            </ProtectedRoute>
          </Route>

          {/* CONTENT ROUTES */}

          <Route exact path={["/content"]}>
            <ProtectedRoute>
              <Content/>
            </ProtectedRoute>
          </Route>

          <Route exact path={["/content/scene/:sceneId"]}>
            <ProtectedRoute>
              <PageWrapper>
                <Link to="/content">{`< Back to Content`}</Link>
                <p>content - preview scene :sceneId</p>
              </PageWrapper>
            </ProtectedRoute>
          </Route>

          {/* HOME ROUTES */}

          <Route exact path={["/", "/home"]}>
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          </Route>

        </Switch>

        <NotificationContainer />
      </main>
    </Router>
  );
};

export default App;
