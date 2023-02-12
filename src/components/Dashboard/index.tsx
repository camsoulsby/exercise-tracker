import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-location";
import {
  createUser,
  deleteUser,
  addToUserAge,
  getUsers,
} from "../../firestore";

type DashboardProps = {};

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const [users, setUsers] = useState<
    Array<{ id: string; name: string; age: number }>
  >([]);
  const [newNameVal, setNewNameVal] = useState("");
  const [newAgeVal, setNewAgeVal] = useState(0);

  const fetchData = async () => {
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate({ to: "../login" });
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <h1>Profile</h1>
      {error ? <p>{error}</p> : null}

      <strong>Current user:</strong>
      {currentUser?.email}

      <h2>Users</h2>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Name: {user.age}</h1>
            <button
              onClick={() => {
                addToUserAge(user.id, user.age);
                fetchData();
              }}
            >
              Increase age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
                fetchData();
              }}
            >
              Delete user
            </button>
          </div>
        );
      })}
      {/* <input
        placeholder="Name..."
        value={newNameVal}
        onChange={(event) => {
          setNewNameVal(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        value={newAgeVal}
        onChange={(event) => {
          setNewAgeVal(parseInt(event.target.value));
        }}
      /> */}
      {/* <Button
        onClick={() => {
          createUser(currentUser.uid,newNameVal, newAgeVal);
          setNewAgeVal(0);
          setNewNameVal("");
          fetchData();
        }}
      >
        Add user
      </Button> */}

      <Link to="/update-profile">Update Profile</Link>
      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
    </>
  );
};
