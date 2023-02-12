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
  newName: string,
  newDisciplines: string[],
  newGoals: {discipline: string, targetReps: number}[],
  newSets: {discipline: string, timeStamp: Date, reps: number}[]
) => {
  const docRef = doc(db, "users", newUid);
  const data = { name: newName };
  await setDoc(docRef, data);

  const disciplinesRef = collection(docRef,"disciplines");
    newDisciplines.forEach(async (discipline) => {
      const disciplinesDocRef = doc(docRef, "disciplines", discipline);
      
      await setDoc(disciplinesDocRef, { name: discipline })
    });

    const goalsRef = collection(docRef,"goals");
    newGoals.forEach(async (goal) => {await addDoc(goalsRef, {goal});

    
    newSets.forEach(async (set) => {
      const disciplinesDocRef = doc(disciplinesRef, set.discipline);
    const setsRef = collection(disciplinesDocRef,"sets");
      await addDoc(setsRef, {set})
    });

})
}

//read
export const getUsers = async () => {
  const usersCollectionRef = collection(db, "users");
  const data = await getDocs(usersCollectionRef);
  const mappedData = data.docs.map((doc) => {
    const userData = doc.data();
    return {
      id: doc.id,
      name: userData.name || "",
      age: userData.age || 0,
    };
  });
  return mappedData;
};

//update
export const addToUserAge = async (id: string, currentAge: number) => {
  const newFields = { age: currentAge + 1 };
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, newFields);
};

//delete
export const deleteUser = async (id: string) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
