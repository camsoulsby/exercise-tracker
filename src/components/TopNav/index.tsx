import React, { useState, useEffect } from "react";
import { Link } from "react-location";
import { Home, Settings } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { getUsername } from "../../firestore";

interface TopNavProps {}

export const TopNav: React.FC<TopNavProps> = () => {
  const [username, setUsername] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const getName = async () => {
      if (currentUser) {
        try {
          const name = await getUsername(currentUser.uid);
          setUsername(name);
        } catch (error) {
          console.log({ error });
        }
      }
    };
    getName();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{backgroundColor: 'primary.main'}}>
        <Link to="/">
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home sx={{color: "primary.contrastText"}}/>
          </IconButton>
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }} align="center">
        
        {username !== '' ? `Logged in as ${username}` : ''}

          
          
        </Typography>
        <Link to="/account">
        <IconButton edge="end" color="inherit" aria-label="account">
          <Settings sx={{color: "primary.contrastText"}}/>
        </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
