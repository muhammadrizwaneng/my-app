'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  email: string;
  first_name: string;
  last_name: string;
  number: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/alluser');
        console.log("-=-==--=",response?.data)
        if(response?.data?.code == 200 && response?.data?.users.length > 0){
            setUsers(response.data?.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (email: string) => {

    try {
      await axios.delete(`http://localhost:5000/users/${email}`);
      setUsers(users.filter(user => user.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.number}</td>
              <td>
                <button onClick={() => handleDelete(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
  .user-list {
    width: calc(100% - 280px); /* Adjust based on the width of the left navigation */
    padding: 20px;
    box-sizing: border-box;
    margin-left: 280px; /* Adjust this value to create space for the left navigation */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    overflow-wrap: break-word; /* Ensures long text wraps instead of overflowing */
  }

  th {
    background-color: #f4f4f4;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px; /* Rounded corners for buttons */
  }

  button:hover {
    background-color: #c62828;
  }
`}</style>

    </div>
  );
};

export default UserList;
