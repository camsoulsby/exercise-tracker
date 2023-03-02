import { Typography, Box, Button } from "@mui/material";
import React, {useState} from "react";
import { addGoal } from "../../firestore";

interface MenuPopupProps {

    disciplineName: string;
    userId: string;
  disciplineId: string;
  updateData: () => void;
}

export const MenuPopup: React.FC<MenuPopupProps> = ({ disciplineName, userId, disciplineId, updateData
}) => {

    const handleAddGoal = () => {
        addGoal(userId, disciplineId, "daily", 100 )
        addGoal(userId, disciplineId, "weekly", 700 )
        addGoal(userId, disciplineId, "monthly", 3000 )
        addGoal(userId, disciplineId, "yearly", 36500 )
        updateData();
    }
 
  return (
    <Box
      sx={{
        backgroundColor: "grey.500",
        position: "absolute",
        top: "50px",
        left: "50px",
        right: "50px",
        bottom: "50px",
        zIndex: 1,
      }}
    >
     <Typography variant="h4">Menu {disciplineName}</Typography>
     <Button onClick={handleAddGoal}>Add Goal</Button>
    </Box>
  );
};
