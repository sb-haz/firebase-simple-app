import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase-config'
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  // User collection reference
  const usersCollectionReference = collection(db, "users")

  // Create user
  const createUser = async (user) => {
    await addDoc(usersCollectionReference, { name: newName, age: newAge })
  }

  // Update user age
  const updateUserAge = async (id, age) => {
    const userDoc = doc(db, "users", id)
    await updateDoc(userDoc, { age: age })
  }

  // Get all users from the database
  useEffect(() => {
    const getUsers = async () => {
      // Get data from user collection
      const data = await getDocs(usersCollectionReference)
      // Add user information to users state
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    // Run getUsers function
    getUsers();

  })

  return (
    <div className="App">

      <input
        type='text'
        placeholder='Name'
        onChange={(event) => { setNewName(event.target.value) }}
      />
      <input
        type='number'
        placeholder='Age'
        onChange={(event) => { setNewAge(event.target.value) }}
      />

      <button onClick={createUser}>Create User</button>

      {/* Display all users */}
      {users.map(user => {
        return (
          <div>
            <h1>{user.name}</h1>
            <h1>{user.age}</h1>
            {/* Increase user age */}
            <button onClick={() => { updateUserAge(user.id, user.age - 1) }}
            > - 1 </button>
            {/* Decrease user age */}
            <button onClick={() => { updateUserAge(user.id, user.age + 1) }}
            > + 1 </button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
