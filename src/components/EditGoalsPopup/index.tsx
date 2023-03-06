import { Typography, Box, Button, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";

interface EditGoalsPopupProps {
  disciplineName: string;
  hideEditGoalsPopup: () => void;
  currentGoals: {
    day: number;
    week: number;
    month: number;
    year: number;
  }
  updateGoals: (type: string, targetReps: number) => void;
}

export const EditGoalsPopup: React.FC<EditGoalsPopupProps> = ({
  disciplineName,
  hideEditGoalsPopup,
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
        top: "5px",
        left: "5px",
        right: "5px",
        bottom: "5px",
        zIndex: 10,
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
      <Button onClick={handleAddGoal}>Update Goal</Button>
      <Button variant= 'contained' color='warning' onClick={hideEditGoalsPopup}>Close</Button>
    </Box>
  );
};
