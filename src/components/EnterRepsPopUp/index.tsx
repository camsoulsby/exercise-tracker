import React, {useState} from "react";
import { Button, Box ,TextField} from "@mui/material";
import { addSet } from "../../firestore";

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
  updateData
}) => {
  const [repsToAdd, setRepsToAdd] = useState(numberReps);
  const [validInput, setValidInput] = useState(numberReps>0);

  const handleEnterReps = (repsToEnter: number) => {
    addSet(userId, disciplineId, {
      timeStamp: new Date(),
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
  
  }}



  return (
    <Box
      sx={{
        backgroundColor: "grey.500",
        position: "absolute",
        top: "50px",
        left: "50px",
        right: "50px",
        bottom: "50px",
        zIndex: 1,
      }}
    >
      
      
      { numberReps === 0 ? 
      <TextField label="Number of reps" onChange={handleInputChange} /> 
      : 
      <h3>Confirm adding {numberReps} {disciplineName}</h3>}

      <p>Date: "Todo"</p>
      <Button disabled={!validInput} variant= 'contained' color= 'success' onClick={() => {handleEnterReps(repsToAdd)}}>Confirm</Button>
      <Button variant= 'contained' color='warning' onClick={hideEnterRepsPopup}>Cancel</Button>
    </Box>
  );
};
