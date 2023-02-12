import React from 'react'
import { Link } from 'react-location'
import { Home, Person } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

interface TopNavProps {}

export const TopNav: React.FC<TopNavProps> = () => {

    const { currentUser } = useAuth();

  return (<>
   
   <Link to="/"><Home /></Link>
   <strong>Logged in as:</strong>
      {currentUser?.email}
    <Link to="/account"><Person /></Link>
  </>
   
  )
}
