import React from 'react'
import { useState, useEffect } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "../services/userService";


const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
      name: "",
      age: 0,
    });
  
    const handleCreateUser = async () => {
      await createUser(user);
      fetchUsers();
    };
    const handleUpdateUser = async (id, age) => {
      await updateUser(id, age);
      fetchUsers();
    };
    const handleDeleteUser = async (id) => {
      await deleteUser(id);
      fetchUsers();
    }
  
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData); 
    }
  
    useEffect(() => {
      fetchUsers();
      // console.log("data fetched");
    },[]);
  
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
          <button onClick={handleCreateUser}>Create User</button>
        </div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <h2>{user.id}</h2>
              <p>{user.age}</p>
              <button onClick={()=>{handleUpdateUser(user.id, user.age)}}>Increase Age</button>
              <button onClick={()=>{handleDeleteUser(user.id, user.age-1)}}>Delete user</button>
            </div>
          );
        })}
      </div>
    );
}

export default HomePage
