import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import { GoalProgressCard } from "../../components";

interface GoalProgressSectionProps {
  goals: { day: number; week: number; month: number; year: number };
  cumulative: { day: number; week: number; month: number; year: number };
}

export const GoalProgressSection: React.FC<GoalProgressSectionProps> = ({
  goals,
  cumulative,
}) => {
  return (
    <Container
      sx={{ backgroundColor: "white", height: "100px", width: "100%" }}
    >
        {goals.day != 0 && <GoalProgressCard type={'Daily'} cumulative={cumulative.day} target={goals.day}></GoalProgressCard>}
        {goals.week != 0 && <GoalProgressCard type={'Weekly'} cumulative={cumulative.week} target={goals.week}></GoalProgressCard>}
        {goals.month != 0 && <GoalProgressCard type={'Monthly'} cumulative={cumulative.month} target={goals.month}></GoalProgressCard>}
        {goals.year != 0 && <GoalProgressCard type={'Yearly'} cumulative={cumulative.year} target={goals.year}></GoalProgressCard>}
    </Container>
  );
};
