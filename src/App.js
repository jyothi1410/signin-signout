import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import AllProfiles from "./AllProfiles";
import { ALL_PROFILE_URL, HOME_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL } from "./constant";
import Home from "./Home";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";

const RoutesData = () => {
  let routes = useRoutes([
    { path: ALL_PROFILE_URL, element: requireAuth(<AllProfiles />) },
    { path: PROFILE_URL, element: requireAuth(<MyProfile />) },
    { path: LOGIN_URL, element: redirectAuth(<Login />) },
    { path: REGISTER_URL, element: redirectAuth(<Register />) },
    { path: HOME_URL, element: <Home /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <Router>
      <RoutesData />
    </Router>
  );
};

function requireAuth(Component) {
  const authenticated = JSON.parse(sessionStorage.getItem('isLogged'))
  if (authenticated) return Component
  else return <Home />
}

function redirectAuth(Component) {
  const authenticated = JSON.parse(sessionStorage.getItem('isLogged'))
  if (!authenticated) return Component
  else return <Home />
}
export default App;
