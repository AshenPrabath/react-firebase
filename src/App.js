import { useState, useEffect } from "react";
import "./App.css";
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [user, setUser] = useState({
    name: "",
    age: 0,
  });

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: user.name, age: Number(user.age) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields ={age:age+1}
    await updateDoc(userDoc,newFields);
  };

  const deleteUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  });

  return (
    <div className="App">
      <div>
        <input
          placeholder="Name"
          onChange={(e) => {
            setUser((prevUser) => ({ ...prevUser, name: e.target.value }));
          }}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setUser((prevUser) => ({ ...prevUser, age: e.target.value }));
          }}
        />
        <button onClick={createUser}>Create User</button>
      </div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h2>{user.id}</h2>
            <p>{user.age}</p>
            <button onClick={()=>{updateUser(user.id, user.age)}}>Increase Age</button>
            <button onClick={()=>{deleteUser(user.id, user.age-1)}}>Delete user</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
