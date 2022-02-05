import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ScenePreview from "../pages/ScenePreview";
import AddEditGallery from "../pages/AddEditGallery";
import UserGallery from "../pages/UserGallery";
import GalleryView from "../pages/GalleryView";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import "./style.scss";
import SceneTest from "../pages/SceneTest";

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

          <Route exact path={["/preview/:sceneId"]}>
            <ProtectedRoute>
              <SceneTest/>
            </ProtectedRoute>
          </Route>

          <Route exact path={["/gallery/new"]}>
            <ProtectedRoute>
              <AddEditGallery />
            </ProtectedRoute>
          </Route>

          <Route exact path={["/gallery/edit/:galleryId"]}>
            <ProtectedRoute>
              <AddEditGallery />
            </ProtectedRoute>
          </Route>

          <Route exact path={["/gallery/:galleryId"]}>
            <ProtectedRoute>
              <UserGallery />
            </ProtectedRoute>
          </Route>

          <Route exact path={["/gallery/view/:galleryId"]}>
            <ProtectedRoute>
              <GalleryView />
            </ProtectedRoute>
          </Route>

          <Route exact path={["/", "/home"]}>
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Route>

        </Switch>

        <NotificationContainer />
      </main>
    </Router>
  );
};

export default App;
