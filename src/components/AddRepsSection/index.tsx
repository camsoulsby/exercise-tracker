import React, { useState, useEffect } from "react";
import { Container, Button, Box, Typography, ButtonGroup } from "@mui/material";
import { Add, Close } from "@mui/icons-material";

interface AddRepsSectionProps {
  repsToAdd: number;
  increaseRepsToAdd: (reps: number) => void;
setShowEnterRepsPopup: (show: boolean) => void;
clearRepsToAdd: () => void;
}

export const AddRepsSection: React.FC<AddRepsSectionProps> = ({
    repsToAdd,
    increaseRepsToAdd,
    setShowEnterRepsPopup,
    clearRepsToAdd,
}) => {
  return (
<Container
        sx={{
          width: "auto",
          padding: "0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button disabled={repsToAdd==0} onClick={() => {setShowEnterRepsPopup(true)}} variant="contained" color="secondary" sx={{ margin: "5px 0px 10px 0px", width: '360px' }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "secondary.contrastText" }}
            >
              Add
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "secondary.contrastText", marginX: "10px" }}
            >
              {repsToAdd}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "secondary.contrastText" }}
            >
              reps
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <ButtonGroup>
          <Button
            sx={{
              borderColor: "primary.contrastText",
              color: "primary.contrastText",
              width: "90px",
              height: "50px",

            }}
            startIcon={<Add />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              increaseRepsToAdd(10);
            }}
          >
            10
          </Button>
          <Button
            sx={{
              borderColor: "primary.contrastText",
              color: "primary.contrastText",
              width: "90px",
              height: "50px",
            }}
            startIcon={<Add />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              increaseRepsToAdd(5);
            }}
          >
            5
          </Button>
          <Button
            sx={{
              borderColor: "primary.contrastText",
              color: "primary.contrastText",
              width: "90px",
              height: "50px",
            }}
            startIcon={<Add />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              increaseRepsToAdd(1);
            }}
          >
            1
          </Button>
          <Button
            sx={{
              borderColor: "primary.contrastText",
              color: "primary.contrastText",
              width: "90px",
              height: "50px",
            }}
            startIcon={<Close />}
            variant="outlined"
            color="secondary"
            onClick={clearRepsToAdd}
          >
            Clear
          </Button>
        </ButtonGroup>
        </Box>
      </Container>
  );
};