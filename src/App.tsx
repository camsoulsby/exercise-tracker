import { Router, Route, Outlet, ReactLocation, Link } from "react-location";
import {
  Dashboard,
  Signup,
  Login,
  PrivateRoute,
  ResetPassword,
  AccountSettings,
  TopNav,
} from "./components";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./themes/DarkTheme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    path: "/account",
    element: (
      <PrivateRoute>
        <AccountSettings />
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
];

const location = new ReactLocation();

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router routes={routes} location={location}>
          <AuthProvider>
            <TopNav />

            <Outlet />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
