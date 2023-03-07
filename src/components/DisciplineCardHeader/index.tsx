import React from "react";
import { Typography, Box } from "@mui/material";

interface DisciplineCardHeaderProps {
  disciplineName: string;
  lastSet: Date;
}

const printFormattedDateString = (date: Date) => {
    const todayDate = new Date();
    if (date.toString() === "Invalid Date") {
      return "N/A";
    }
    if (date.getDate() === todayDate.getDate()) {
      return `at ${date.getHours()}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}`;
    } else {
      return `on ${date.toLocaleDateString()}`;
    }
  };


export const DisciplineCardHeader: React.FC<DisciplineCardHeaderProps> = ({
  disciplineName,
  lastSet
}) => {



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
        {disciplineName}
      </Typography>
      <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
        Last set {printFormattedDateString(lastSet)}
      </Typography>
    </Box>
  );
};
