import { Router, Route, Outlet, ReactLocation, Link } from "react-location";
import { Goals, Dashboard, Signup, Login, PrivateRoute, ResetPassword, UpdateProfile } from "./components";
import { Button, ButtonGroup } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";

const routes: Route[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/update-profile",
    element: (
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/goals",
    element: (
      <PrivateRoute>
        <Goals />
      </PrivateRoute>
    ),
  },
];

const location = new ReactLocation();

function App() {
  return (
    <Router routes={routes} location={location}>
      <AuthProvider>
        <ButtonGroup>
          <Button>
            <Link to="/">Dashboard</Link>
          </Button>
          <Button>
            <Link to="/goals">Goals</Link>
          </Button>
        </ButtonGroup>

        <Outlet />
      </AuthProvider>
    </Router>
  );
}

export default App;
