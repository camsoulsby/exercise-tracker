import React, { useState, useEffect } from "react";
import { Container, Typography, Button, ButtonGroup } from "@mui/material";
import { Add, Menu, OneKPlusOutlined } from "@mui/icons-material";
import {
  getGoals,
  getMostRecentSetDate,
  getTotalRepsForPeriod,
} from "../../firestore";
import {
  EnterRepsPopup,
  MenuPopup,
  GoalProgressSection,
} from "../../components";

interface DisciplineCardProps {
  disciplineName: string;
  userId: string;
  disciplineId: string;
  updateData: () => void;
}

export const DisciplineCard: React.FC<DisciplineCardProps> = ({
  disciplineName,
  userId,
  disciplineId,
  updateData,
}) => {
  const [showEnterRepsPopup, setShowEnterRepsPopup] = useState(false);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [repsToAdd, setRepsToAdd] = useState(0);
  const [lastSet, setLastSet] = useState(new Date());
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

  const handleHidePopups = () => {
    setShowEnterRepsPopup(false);
  };

  const handleEnterReps = (repsToAdd: number) => {
    setRepsToAdd(repsToAdd);
    setShowEnterRepsPopup(true);
  };

  const getCumulativeReps = async () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // adjust this later to allow custom start of day

    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // add one to start week on Monday
    // console.log(startOfWeek)

    const startOfMonth = new Date();
    startOfMonth.setHours(0, 0, 0, 0);
    startOfMonth.setDate(1);
    // console.log(startOfMonth)

    const startOfYear = new Date();
    startOfYear.setHours(0, 0, 0, 0);
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

  useEffect(() => {
    getCumulativeReps();
    getLastSetDate();
    getAllGoals();
  }, []);

  const updateAllData = () => {
    updateData();
    getCumulativeReps();
    getLastSetDate();
    getAllGoals();
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

  const toggleMenu = () => {
    setShowMenuPopup(!showMenuPopup);
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
          updateData={updateAllData}
          hideEnterRepsPopup={handleHidePopups}
        />
      )}
      {showMenuPopup && (
        <MenuPopup
          disciplineName={disciplineName}
          disciplineId={disciplineId}
          userId={userId}
          updateData={updateAllData}
        />
      )}
      <Menu onClick={toggleMenu} />
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
    </Container>
  );
};
