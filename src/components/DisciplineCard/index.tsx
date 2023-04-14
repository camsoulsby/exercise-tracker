import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
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
  AddRepsSection,
  DisciplineCardHeader
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getCumulativeReps();
    getLastSetDate();
    getAllGoals();
  };

  const handleHideEnterRepsPopup = () => {
    setRepsToAdd(0);
    setShowEnterRepsPopup(false);
  };
  const handleHideEditGoalsPopup = () => {
    setShowEditGoalsPopup(false);
  };

  const increaseRepsToAdd = (increaseBy: number) => {
    setRepsToAdd(repsToAdd + increaseBy);
  };

  const clearRepsToAdd = () => {
    setRepsToAdd(0);
  };

  const updateGoals = (type: string, targetReps: number) => {
    addGoal(userId, disciplineId, type, targetReps);
    getAllGoals();
  };

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

  return (
    <Container
      sx={{
        position: "relative",
        backgroundColor: "primary.main",
        borderTop: "1px solid white",
        width: "auto",
        padding: "5px",
      }}
    >
      {showEnterRepsPopup && (
        <EnterRepsPopup
          disciplineName={disciplineName}
          numberReps={repsToAdd}
          userId={userId}
          disciplineId={disciplineId}
          updateData={fetchData}
          hideEnterRepsPopup={handleHideEnterRepsPopup}
        />
      )}
      {showEditGoalsPopup && (
        <EditGoalsPopup
          disciplineName={disciplineName}
          hideEditGoalsPopup={handleHideEditGoalsPopup}
          currentGoals={goals}
          updateGoals={updateGoals}
        />
      )}
      <DisciplineCardHeader disciplineName={disciplineName} lastSet={lastSet}/>
      

      <AddRepsSection
        repsToAdd={repsToAdd}
        increaseRepsToAdd={increaseRepsToAdd}
        setShowEnterRepsPopup={setShowEnterRepsPopup}
        clearRepsToAdd={clearRepsToAdd}
      />

      <GoalProgressSection
        goals={goals}
        cumulative={cumulative}
        showEditGoalsPopup={setShowEditGoalsPopup}
      />
    </Container>
  );
};
