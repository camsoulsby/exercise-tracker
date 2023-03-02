import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";

interface GoalProgressCardProps {
    type: string;
    cumulative: number;
  target: number;
}

export const GoalProgressCard: React.FC<GoalProgressCardProps> = ({type, cumulative, target}) => {
  

    return (
        <Container>
           {type} {cumulative} / {target}
        </Container>

)
}