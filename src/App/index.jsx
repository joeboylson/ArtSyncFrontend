import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddEditGallery from "../pages/AddEditGallery";
import ProtectedRoute from "../layouts/ProtectedRoute";
import Explore from "../pages/Explore";
import Gallery from "../pages/Gallery";
import Content from "../pages/Content";
import Profile from "../pages/Profile";
import ProfileContextWrapper from "../context/ProfileContext";
import ModalContextWrapper from "../context/ModalContext";
import PreviewScene from "../pages/PreviewScene";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import "./style.scss";
import ViewGallery from "../pages/ViewGallery";

const App = () => {
  return (
    <Router>
      <ProfileContextWrapper>
        <ModalContextWrapper>
          <main>
            
            <Switch>

              {/* login page */}
              <Route exact path={["/login"]}>
                <Login />
              </Route>

              {/* register route */}
              <Route exact path={["/register"]}>
                <Register />
              </Route>

              {/* create/edit gallery */}
              <Route exact path={["/gallery/new", "/gallery/edit/:galleryId"]}>
                <ProtectedRoute>
                  <AddEditGallery/>
                </ProtectedRoute>
              </Route>

              {/* view gallery details */}
              <Route exact path={["/gallery/:galleryId"]}>
                <ProtectedRoute>
                  <Gallery/>
                </ProtectedRoute>
              </Route>

              {/* explore all galleries */}
              <Route exact path={["/explore"]}>
                <ProtectedRoute>
                  <Explore/>
                </ProtectedRoute>
              </Route>

              {/* view profile */}
              <Route exact path={["/profile/:userId"]}>
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
              </Route>

              {/* view your content */}
              <Route exact path={["/content"]}>
                <ProtectedRoute>
                  <Content/>
                </ProtectedRoute>
              </Route>

              {/* preview a scene */}
              <Route exact path={["/content/scene/:sceneId"]}>
                <ProtectedRoute>
                  <PreviewScene/>
                </ProtectedRoute>
              </Route>

              {/* open a gallery */}
              <Route exact path={["/gallery/view/:galleryId"]}>
                <ProtectedRoute>
                  <ViewGallery/>
                </ProtectedRoute>
              </Route>

              {/* home */}
              <Route exact path={["/", "/home"]}>
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              </Route>

            </Switch>

            <NotificationContainer />
          </main>
        </ModalContextWrapper>
      </ProfileContextWrapper>
    </Router>
  );
};

export default App;
