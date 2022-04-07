import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([]);
  // User collection reference
  const usersCollectionReference = collection(db, "users")

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

  }, [])

  return (
    <div className="App">
      {/* Display all users */}
      {users.map(user => {
        return (
          <div>
            <h1>{user.name}</h1>
            <h1>{user.age}</h1>
          </div>
        )
      })}
    </div>
  );
}

export default App;
