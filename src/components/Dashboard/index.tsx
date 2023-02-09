import React, { useState } from "react";
import { Button } from "@mui/material";
import { updateCurrentUser } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-location";

type DashboardProps = {};

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate({ to: "../login" })
    } catch {
      setError("Failed to log out");
    }

  }

  return (
    <>
      <h1>Profile</h1>
      {error ? <p>{error}</p> : null}
      {/* is the optional chaining the best way to do this? */}
      <strong>Email:</strong>{currentUser?.email}
      <Link to='/update-profile'>Update Profile</Link>
      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
    </>
  );
};
