import React from "react";
import { useNavigate } from "react-location";
import { useAuth } from "../../contexts/AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
  }
  

 export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate({ to: "/login" });
    return null;
  }
  return <>{children}</>;
}


