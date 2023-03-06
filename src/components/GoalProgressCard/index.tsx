import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ProgressBar } from "../../components";

interface GoalProgressCardProps {
    label: string;
    cumulative: number;
  target: number;
}

export const GoalProgressCard: React.FC<GoalProgressCardProps> = ({label, cumulative, target}) => {
  

    return (
        <Box sx={{padding: '0px', display: "flex",
        justifyContent: "space-between",
        alignItems: "center",}}>
          
      
      
   
          <Typography variant="body1" sx={{color:'primary.contrastText'}}>
          
          {label} {cumulative} / {target}
          </Typography>
          <ProgressBar cumulative={cumulative} target={target} />
        </Box>

)
}