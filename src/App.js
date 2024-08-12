import { useState, useEffect } from "react";
import "./App.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [user, setUser] = useState({
    name: "",
    age: 0,
  });

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: user.name, age: user.age });
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
          </div>
        );
      })}
    </div>
  );
}

export default App;
