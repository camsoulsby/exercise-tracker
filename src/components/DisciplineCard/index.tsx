import React, { useState, useEffect } from "react";
import { Container, Typography, Button, ButtonGroup } from "@mui/material";
import { Add, LastPage } from "@mui/icons-material";
import { addGoal, addSet, getMostRecentSetDate, getTotalRepsForPeriod } from "../../firestore";
import { EnterRepsPopup } from "../../components";

interface DisciplineCardProps {
  disciplineName: string;
  userId: string;
  disciplineId: string;
  updateData: () => void;
}

const printDate = (date: Date) => {
    const todayDate = new Date()
    if (date.getDate() === todayDate.getDate()) {
        return (`${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`)
    } else {
        return (`${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} on ${date.toLocaleDateString()}`)
    }

     
    
}


export const DisciplineCard: React.FC<DisciplineCardProps> = ({
  disciplineName,
  userId,
  disciplineId,
  updateData,
}) => {
  const [showEnterRepsPopup, setShowEnterRepsPopup] = useState(false);
  const [repsToAdd, setRepsToAdd] = useState(0);
  const [repsToday, setRepsToday] = useState(0);
  const [lastSet, setLastSet] = useState(new Date());

  const handleHidePopups = () => {
    setShowEnterRepsPopup(false);
  };

  const handleEnterReps = (repsToAdd: number) => {
    setRepsToAdd(repsToAdd);
    setShowEnterRepsPopup(true);
  };

  const getRepsToday = async () => {
    const reps = await getTotalRepsForPeriod(userId, disciplineId);
    setRepsToday(reps);
  };
  const getLastSetDate= async () => {
    const last = await getMostRecentSetDate(userId, disciplineId);
    setLastSet(last);
  };

  useEffect(() => {
    getRepsToday();
    getLastSetDate();
  }, []);

  const updateAllData = () => {
    updateData();
    getRepsToday();
    getLastSetDate();
  };

  return (
    <Container
      sx={{
        position: "relative",
        backgroundColor: "grey.300",
        margin: "10px 0 10px 0",
        height: "240px",
      }}
    >
      {showEnterRepsPopup && (
        <EnterRepsPopup
          disciplineName={disciplineName}
          numberReps={repsToAdd}
          userId={userId}
          disciplineId={disciplineId}
          updateData={updateAllData}
          hideEnterRepsPopup={handleHidePopups}
        />
      )}

      <Typography variant="h4">{disciplineName}</Typography>
      <Typography variant="h5">{`Today: ${repsToday}`}</Typography>
      <Typography variant="h6">Last set: {printDate(lastSet)}</Typography>
      <ButtonGroup>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEnterReps(10);
          }}
        >
          10 Reps
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEnterReps(20);
          }}
        >
          20 Reps
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEnterReps(30);
          }}
        >
          30 Reps
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEnterReps(0);
          }}
        >
          Custom
        </Button>
      </ButtonGroup>
      {/* <Button
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
      </Button> */}
    </Container>
  );
};
