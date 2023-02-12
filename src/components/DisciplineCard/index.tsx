import React from 'react'
import { Link } from 'react-location'
import { Home, Person } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import {
    deleteUser,
    addDiscipline,
    addGoal,
    addSet,
    getDisciplines,
  } from "../../firestore";


interface DisciplineCardProps {
    name: string,
    userId: string,
    disciplineId: string,
    updateData: () => void
}

export const DisciplineCard: React.FC<DisciplineCardProps> = ({name, userId, disciplineId, updateData}) => {

    return(
<>
<h1>{name}</h1>
<button
  onClick={() => {
    addGoal(userId, disciplineId,{
      targetReps: 100,
      startDate: new Date(),
      endDate: new Date()
    });
    updateData();
  }}
>
  Add Goal
</button>
<button
  onClick={() => {
    addSet(userId, disciplineId, {
      timeStamp: new Date(),
      reps: 10,
    });
    updateData();
  }}
>
  Add 10 Reps
</button>
</>
    )
}



