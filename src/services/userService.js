import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const usersCollectionRef = collection(db, "users");

export const createUser = async (user) => {
    await addDoc(usersCollectionRef, { name: user.name, age: Number(user.age) });
};

export const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 }
    await updateDoc(userDoc, newFields);
};

export const deleteUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
};

export const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    return (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};