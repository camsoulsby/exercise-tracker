import { db } from "./firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  addDoc
} from "firebase/firestore";

//create
export const createUser = async (
  newUid: string,
  newEmail: string,
) => {
  const docRef = doc(db, "users", newUid);
  const data = { email: newEmail };
  await setDoc(docRef, data);

}

//read
export const getUsers = async () => {
  const usersCollectionRef = collection(db, "users");
  const data = await getDocs(usersCollectionRef);
  const mappedData = data.docs.map((doc) => {
    const userData = doc.data();
    return {
      id: doc.id,
      email: userData.email || "",
    };
  });
  return mappedData;
};

export const getDisciplines = async (userId: string) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const data = await getDocs(disciplinesRef);
  const mappedData = data.docs.map((doc) => {
    const disciplineData = doc.data();
    return {
      id: doc.id,
      name: disciplineData.name || "",
    };
  });
  return mappedData;
}

//update
export const addDiscipline = async (userId: string, newDiscipline: string) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  await addDoc(disciplinesRef, { name: newDiscipline });
}

export const addGoal = async (userId: string, disciplineId: string, goal:{targetReps: number, startDate: Date, endDate: Date }) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const disciplineDoc = doc(disciplinesRef, disciplineId);
  const goalsRef = collection(disciplineDoc, "goals");
  await addDoc(goalsRef, {goal})
  
}

export const addSet = async (userId: string, disciplineId: string, set: { timeStamp: Date, reps: number}) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const disciplineDoc = doc(disciplinesRef, disciplineId);
  const setsRef = collection(disciplineDoc, "sets");
  await addDoc(setsRef, {set})
}

//delete
export const deleteUser = async (id: string) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
