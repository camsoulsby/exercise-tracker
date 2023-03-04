import React, { useState, useEffect } from "react";
import { Container, Typography, Button, ButtonGroup } from "@mui/material";
import { Add, Menu } from "@mui/icons-material";
import {
  getGoals,
  getMostRecentSetDate,
  getTotalRepsForPeriod,
  addGoal,
  getDayStartHour,
} from "../../firestore";
import {
  EnterRepsPopup,
  EditGoalsPopup,
  GoalProgressSection,
} from "../../components";

interface DisciplineCardProps {
  disciplineName: string;
  userId: string;
  disciplineId: string;
}



export const DisciplineCard: React.FC<DisciplineCardProps> = ({
  disciplineName,
  userId,
  disciplineId,
}) => {
  const [showEnterRepsPopup, setShowEnterRepsPopup] = useState(false);
  const [showEditGoalsPopup, setShowEditGoalsPopup] = useState(false);
  const [repsToAdd, setRepsToAdd] = useState(0);
  const [lastSet, setLastSet] = useState(new Date());  // seems like this doesn't need to be state?
  const [goals, setGoals] = useState<{
    day: number;
    week: number;
    month: number;
    year: number;
  }>({ day: 0, week: 0, month: 0, year: 0 });
  const [cumulative, setCumulative] = useState<{
    day: number;
    week: number;
    month: number;
    year: number;
  }>({ day: 0, week: 0, month: 0, year: 0 });
 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getCumulativeReps();
    getLastSetDate();
    getAllGoals();
  };

  const handleHidePopups = () => {
    setShowEnterRepsPopup(false);
    setShowEditGoalsPopup(false);
  };

  const handleEnterReps = (repsToAdd: number) => {
    setRepsToAdd(repsToAdd);
    setShowEnterRepsPopup(true);
  };

  const updateGoals = (type: string, targetReps: number) => {
    addGoal(userId, disciplineId, type, targetReps )
    getAllGoals();
  }

  const getCumulativeReps = async () => {
    const customStartOfDay = await getDayStartHour(userId);
    const startOfDay = new Date();
    startOfDay.setHours(customStartOfDay, 0, 0, 0);

    const startOfWeek = new Date();
    startOfWeek.setHours(customStartOfDay, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // add one to start week on Monday
    // console.log(startOfWeek)

    const startOfMonth = new Date();
    startOfMonth.setHours(customStartOfDay, 0, 0, 0);
    startOfMonth.setDate(1);
    // console.log(startOfMonth)

    const startOfYear = new Date();
    startOfYear.setHours(customStartOfDay, 0, 0, 0);
    startOfYear.setMonth(0);
    startOfYear.setDate(1);
    // console.log(startOfYear)

    const now = new Date();
    const dayReps = await getTotalRepsForPeriod(
      userId,
      disciplineId,
      startOfDay,
      now
    );
    const weekReps = await getTotalRepsForPeriod(
      userId,
      disciplineId,
      startOfWeek,
      now
    );
    const monthReps = await getTotalRepsForPeriod(
      userId,
      disciplineId,
      startOfMonth,
      now
    );
    const yearReps = await getTotalRepsForPeriod(
      userId,
      disciplineId,
      startOfYear,
      now
    );
    setCumulative({
      day: dayReps,
      week: weekReps,
      month: monthReps,
      year: yearReps,
    });
  };
  const getLastSetDate = async () => {
    const last = await getMostRecentSetDate(userId, disciplineId);
    setLastSet(last);
  };

  const getAllGoals = async () => {
    const data = await getGoals(userId, disciplineId);
    data != null && setGoals(data);
    
  };


  const printFormattedDateString = (date: Date) => {
    const todayDate = new Date();
    if (date.toString() === "Invalid Date") {
      return "No sets recorded";
    }
    if (date.getDate() === todayDate.getDate()) {
      return `${date.getHours()}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )} today`;
    } else {
      return `${date.getHours()}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )} on ${date.toLocaleDateString()}`;
    }
  };


  return (
    <Container
      sx={{
        position: "relative",
        backgroundColor: "grey.300",
        margin: "10px 0 10px 0",
        height: "300px",
      }}
    >
      {showEnterRepsPopup && (
        <EnterRepsPopup
          disciplineName={disciplineName}
          numberReps={repsToAdd}
          userId={userId}
          disciplineId={disciplineId}
          updateData={fetchData}
          hideEnterRepsPopup={handleHidePopups}
        />
      )}
      {showEditGoalsPopup && (
        <EditGoalsPopup
          disciplineName={disciplineName}
          hideEditGoalsPopup={handleHidePopups}
          currentGoals={goals}
          updateGoals={updateGoals}

        />
      )}
      
      <Typography variant="h4">{disciplineName}</Typography>
      <Typography variant="h5">{`Today: ${cumulative.day}`}</Typography>
      <Typography variant="h6">
        Last set: {printFormattedDateString(lastSet)}
      </Typography>
      <ButtonGroup>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEnterReps(10);
          }}
        >
          10
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEnterReps(20);
          }}
        >
          20
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEnterReps(30);
          }}
        >
          30
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
      <GoalProgressSection goals={goals} cumulative={cumulative} />
      {/* Move the below inside the goals progress section and pass through a callback to show the menu */}
      <Menu onClick={() => setShowEditGoalsPopup(true)} />
    </Container>
  );
};
