import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ScenePreview from "../pages/ScenePreview";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import "./style.scss";

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
            <ScenePreview />
          </Route>

          <ProtectedRoute>
            <Route exact path={["/", "/home"]}>
              <Home />
            </Route>
          </ProtectedRoute>

        </Switch>

        <NotificationContainer />
      </main>
    </Router>
  );
};

export default App;
