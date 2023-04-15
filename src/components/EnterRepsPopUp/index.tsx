import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { addSet } from "../../firestore";
import dayjs from "dayjs";

interface EnterRepsPopupProps {
  disciplineName: string;
  numberReps: number;
  hideEnterRepsPopup: () => void;
  userId: string;
  disciplineId: string;
  updateData: () => void;
}

export const EnterRepsPopup: React.FC<EnterRepsPopupProps> = ({
  disciplineName,
  numberReps,
  hideEnterRepsPopup,
  userId,
  disciplineId,
  updateData,
}) => {
  const [repsToAdd, setRepsToAdd] = useState(numberReps);
  const [validInput, setValidInput] = useState(numberReps > 0);
  const [repsDate, setRepsDate] = useState(new Date());

  const handleEnterReps = (repsToEnter: number, repsDate: Date) => {
    addSet(userId, disciplineId, {
      timeStamp: repsDate,
      reps: repsToEnter,
    });
    updateData();
    hideEnterRepsPopup();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidInput(false);
    setRepsToAdd(parseInt(event.target.value));
    if (parseInt(event.target.value) > 0) {
      setValidInput(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        zIndex: 10,
        padding: "10px",
      }}
    >
      {numberReps === 0 ? (
        <TextField label="Number of reps" onChange={handleInputChange} />
      ) : (
        <Typography variant="h5" sx={{ marginBottom: "50px" }}>
          Add {numberReps} {disciplineName}?
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ width: "150px" }}
          disabled={!validInput}
          variant="contained"
          color="success"
          onClick={() => {
            handleEnterReps(repsToAdd, repsDate);
          }}
        >
          Confirm
        </Button>
        <Button
          sx={{ width: "150px" }}
          variant="contained"
          color="warning"
          onClick={hideEnterRepsPopup}
        >
          Cancel
        </Button>
      </Box>

      <Typography variant="h5" sx={{ marginTop: "50px" }}>
        Date:
      </Typography>
      <Typography variant="body1">
        Select custom date/time:
        <DateTimePicker
          value={dayjs(repsDate)}
          onChange={(date) =>
            setRepsDate(date ? dayjs(date).toDate() : new Date())
          }
        />
      </Typography>
    </Box>
  );
};
