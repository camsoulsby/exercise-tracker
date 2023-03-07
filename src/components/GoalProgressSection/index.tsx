import React, { useState, useEffect } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { GoalProgressCard } from "../../components";
import { Edit } from "@mui/icons-material";

interface GoalProgressSectionProps {
  goals: { day: number; week: number; month: number; year: number };
  cumulative: { day: number; week: number; month: number; year: number };
  showEditGoalsPopup: (show: boolean) => void;
}

export const GoalProgressSection: React.FC<GoalProgressSectionProps> = ({
  goals,
  cumulative,
  showEditGoalsPopup
}) => {
  return (
    <Container
      sx={{width: "100%", marginTop: "5px", padding: "5px" }}
    >
         <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}>
            <Typography variant="h6" sx={{color: 'primary.contrastText'}}>Goals</Typography>
            <Edit sx={{color: "primary.contrastText", marginLeft: '5px'}} onClick={() => showEditGoalsPopup(true)} />
        </Box>
        {goals.day > 0 && <GoalProgressCard label={'Daily:'} cumulative={cumulative.day} target={goals.day}></GoalProgressCard>}
        {goals.week > 0 && <GoalProgressCard label={'Weekly:'} cumulative={cumulative.week} target={goals.week}></GoalProgressCard>}
        {goals.month > 0 && <GoalProgressCard label={'Monthly:'} cumulative={cumulative.month} target={goals.month}></GoalProgressCard>}
        {goals.year > 0 && <GoalProgressCard label={'Yearly:'} cumulative={cumulative.year} target={goals.year}></GoalProgressCard>}
        
      
    </Container>
  );
};
