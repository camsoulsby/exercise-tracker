import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
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
  newUsername: string
) => {
  const docRef = doc(db, "users", newUid);
  const data = { email: newEmail, username: newUsername };
  await setDoc(docRef, data);

}

//read
export const getUsername = async (userId: string) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    const username = userData.username;
    return username;
  } else {
    return "null";
  }
}


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

export const getTotalRepsForPeriod = async (userId: string, disciplineId: string, startDate: Date, endDate: Date) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const disciplineDoc = doc(disciplinesRef, disciplineId);
  const setsRef = collection(disciplineDoc, "sets");
  const data = await getDocs(setsRef);
  const mappedData = data.docs.map((doc) => {
    const setData = doc.data();
    return {
      id: doc.id,
      reps: setData.reps || 0,
      timeStamp: setData.timeStamp || new Date(),
    };
  });
  
  const filteredData = mappedData.filter((set) => set.timeStamp.toDate() >= startDate && set.timeStamp.toDate() <= endDate);
  const totalReps = filteredData.reduce((acc, set) => acc + set.reps, 0);
  return totalReps;
}

interface DataPoint {
  timeStamp: Date
}

export const getMostRecentSetDate = async (userId: string, disciplineId: string) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const disciplineDoc = doc(disciplinesRef, disciplineId);
  const setsRef = collection(disciplineDoc, "sets");
  const data = await getDocs(setsRef);
  const mappedData: DataPoint[] = data.docs.map((doc) => {
    const setData = doc.data();
    return {
      timeStamp: setData.timeStamp.toDate()
    };
  });

const lastSetDate = new Date(Math.max(...mappedData.map(set => set.timeStamp.getTime())));
return lastSetDate;
}
export const getGoals = async (userId: string, disciplineId: string): Promise<{day: number, week: number, month: number, year: number} | null> => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const disciplineDoc = doc(disciplinesRef, disciplineId);
  const goalSnapshot = await getDoc(disciplineDoc);
  if (goalSnapshot.exists()) {
    const userData = goalSnapshot.data();
    const dailyGoal = userData.dailyGoal || 0;
    const weeklyGoal = userData.weeklyGoal || 0;
    const monthlyGoal = userData.monthlyGoal || 0;
    const yearlyGoal = userData.yearlyGoal || 0;
    return {day: dailyGoal, week: weeklyGoal, month: monthlyGoal, year: yearlyGoal};
  } else {
    return null;
  }
  
}

export const getDayStartHour = async (userId: string) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    const dayStart = userData.dayStartHour;
    if (dayStart != undefined) {
      return dayStart;
    }
     return 0;
  } else {
    return 0;
  }
}

//update
export const addDiscipline = async (userId: string, newDiscipline: string) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  await addDoc(disciplinesRef, { name: newDiscipline, dailyGoal: 0, weeklyGoal: 0, monthlyGoal: 0, yearlyGoal: 0 });
}
export const setDayStartHour = async (userId: string, startHour: number) => {
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, {
    dayStartHour: startHour
  });
}

export const addGoal = async (userId: string, disciplineId: string, type:string, targetReps:number) =>
{
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const disciplineDoc = doc(disciplinesRef, disciplineId);

  const fieldToUpdate = type + "Goal"; // type will be one of "daily", "weekly", "monthly", "yearly"

  await updateDoc(disciplineDoc, {
    [fieldToUpdate]: targetReps
  });
}

export const addSet = async (userId: string, disciplineId: string, set: { timeStamp: Date, reps: number}) => {
  const userDoc = doc(db, "users", userId);
  const disciplinesRef = collection(userDoc, "disciplines");
  const disciplineDoc = doc(disciplinesRef, disciplineId);
  const setsRef = collection(disciplineDoc, "sets");
  await addDoc(setsRef, set)
}

//delete
export const deleteUser = async (id: string) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
