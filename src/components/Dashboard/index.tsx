import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { DisciplineCard } from "../../components";
import { getDisciplines } from "../../firestore";

type DashboardProps = {};

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
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

  const { currentUser } = useAuth();

  return (
    <>
      {disciplines.map((discipline) => {
        return (
          <div key={discipline.id}>
            <DisciplineCard
              disciplineName={discipline.name}
              userId={currentUser.uid}
              disciplineId={discipline.id}
            />
          </div>
        );
      })}
    </>
  );
};
