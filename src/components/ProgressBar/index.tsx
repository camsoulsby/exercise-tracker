import React from "react";
import { Box } from "@mui/material";

interface ProgressBarProps {
  cumulative: number;
  target: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    cumulative,
    target,
  }) => {
    const barWidth = 200;
    const barHeight = 20;
    const progressWidth = barWidth * cumulative / target;
    const bonusReps = cumulative - target;
  
    return (
      <Box sx={{ position: 'relative', width: `${barWidth}px`, height: `${barHeight}px`, backgroundColor: 'white', display: 'flex' }}>
        <Box sx={{ position: 'absolute', top: -1, right: 0, zIndex: 1, color: 'gold', padding: '0 4px' }}>
          {bonusReps > 0 && `+${bonusReps}`}
        </Box>
        <Box sx={{ width: `${progressWidth}px`, height: `${barHeight}px`, backgroundColor: 'green' }} />
      </Box>
    );
  };
  
