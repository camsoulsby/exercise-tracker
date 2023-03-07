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
  };
  updateGoals: (type: string, targetReps: number) => void;
}

export const EditGoalsPopup: React.FC<EditGoalsPopupProps> = ({
  disciplineName,
  hideEditGoalsPopup,
  updateGoals,
  currentGoals,
}) => {
  const [targetReps, setTargetReps] = useState(currentGoals.day);
  const [goalType, setGoalType] = useState("Daily");

  const handleAddGoal = () => {
    updateGoals(goalType, targetReps);
  };

  const handleGoalTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoalType(event.target.value);

    //how do I do this better?
    let currentGoalForType = 0;
    if (event.target.value == "Daily") currentGoalForType = currentGoals.day;
    if (event.target.value == "Weekly") currentGoalForType = currentGoals.week;
    if (event.target.value == "Monthly")
      currentGoalForType = currentGoals.month;
    if (event.target.value == "Yearly") currentGoalForType = currentGoals.year;

    setTargetReps(currentGoalForType);
  };

  const options = ["Daily", "Weekly", "Monthly", "Yearly"];

  return (
    <Box
      sx={{
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        zIndex: 10,
        padding: "10px",
        backgroundColor: "secondary.main",
      }}
    >
      <Typography variant="h4">Edit goals: {disciplineName}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <TextField
          select
          label="Goal Type"
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
        <TextField
          type="number"
          value={targetReps}
          onChange={(e) => setTargetReps(parseInt(e.target.value))}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Button variant="contained" color="success" onClick={handleAddGoal}>
          Update Goal
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={hideEditGoalsPopup}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};
