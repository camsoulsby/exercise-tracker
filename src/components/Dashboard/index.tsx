import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-location";
import { DisciplineCard } from "../../components";
// import {} from '@mui/icons-material';
import {
  deleteUser,
  addDiscipline,
  addGoal,
  addSet,
  getDisciplines,
} from "../../firestore";


type DashboardProps = {};

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const [newDiscipline, setNewDiscipline] = useState("");
  const [users, setUsers] = useState<Array<{ id: string; email: string }>>([]);
  const [disciplines, setDisciplines] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const fetchData = async () => {
    const updatedDisciplines = await getDisciplines(currentUser.uid);
    setDisciplines(updatedDisciplines);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      {disciplines.map((discipline) => {
        return (
          <div key={discipline.id}>
            <DisciplineCard
              disciplineName={discipline.name}
              userId={currentUser.uid}
              disciplineId={discipline.id}
              updateData={fetchData}
            />
          </div>
        );
      })}
      <input
        placeholder="Add new discipline..."
        value={newDiscipline}
        onChange={(event) => {
          setNewDiscipline(event.target.value);
        }}
      />
      <button
        onClick={() => {
          addDiscipline(currentUser.uid, newDiscipline);
          fetchData();
        }}
      >
        Add
      </button>
      
    </>
  );
};
