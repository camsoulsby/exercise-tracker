import { Typography, Box, Button, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";

interface MenuPopupProps {
  disciplineName: string;
  currentGoals: {
    day: number;
    week: number;
    month: number;
    year: number;
  }
  updateGoals: (type: string, targetReps: number) => void;
}

export const MenuPopup: React.FC<MenuPopupProps> = ({
  disciplineName,
  updateGoals,
  currentGoals
}) => {
  const [targetReps, setTargetReps] = useState(currentGoals.day)
  const [goalType, setGoalType] = useState("daily")


  const handleAddGoal = () => {
    updateGoals(goalType, targetReps);
  };

  const handleGoalTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoalType(event.target.value)

    //how do I do this better?
    let currentGoalForType = 0
    if (event.target.value == 'daily') currentGoalForType = currentGoals.day
    if (event.target.value == 'weekly') currentGoalForType = currentGoals.week
    if (event.target.value == 'monthly') currentGoalForType = currentGoals.month
    if (event.target.value == 'yearly') currentGoalForType = currentGoals.year

    setTargetReps(currentGoalForType)
  }

  const options = [
    'daily',
    'weekly',
    'monthly',
    'yearly'
  ];

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
      <TextField
      select
      label="Select an option"
      value={goalType}
      onChange={handleGoalTypeChange}
      variant="outlined"
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
      <TextField type="number" value={targetReps} onChange={(e)=>setTargetReps(parseInt(e.target.value))}/>
      <Button onClick={handleAddGoal}>Add Goal</Button>
    </Box>
  );
};
