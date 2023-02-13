import React from "react";
import { Container, Typography, Button, ButtonGroup } from "@mui/material";
import { Add } from "@mui/icons-material";
import { addGoal, addSet } from "../../firestore";

interface DisciplineCardProps {
  name: string;
  userId: string;
  disciplineId: string;
  updateData: () => void;
}

export const DisciplineCard: React.FC<DisciplineCardProps> = ({
  name,
  userId,
  disciplineId,
  updateData,
}) => {
  return (
    <Container
      sx={{
        backgroundColor: "grey.300",
        margin: "10px 0 10px 0",
        height: "240px",
      }}
    >
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5">Today:</Typography>
    
      <ButtonGroup>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            addSet(userId, disciplineId, {
              timeStamp: new Date(),
              reps: 10,
            });
            updateData();
          }}
        >
          10 Reps
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            addSet(userId, disciplineId, {
              timeStamp: new Date(),
              reps: 20,
            });
            updateData();
          }}
        >
          20 Reps
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            addSet(userId, disciplineId, {
              timeStamp: new Date(),
              reps: 30,
            });
            updateData();
          }}
        >
          30 Reps
        </Button>
      </ButtonGroup>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          addGoal(userId, disciplineId, {
            targetReps: 100,
            startDate: new Date(),
            endDate: new Date(),
          });
          updateData();
        }}
      >
        Add Goal
      </Button>
    </Container>
  );
};
