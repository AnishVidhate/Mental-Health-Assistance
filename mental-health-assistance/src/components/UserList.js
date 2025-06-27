import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import config from "../Config/Config";
const AllUserList = () => {

  const URL=config.BaseURL;
  const [users, setUsers] = useState([]);
  const [therapists, setTherapists] = useState([]);

  // Fetch users and therapists
  useEffect(() => {
    axios.get(`${URL}/AllUser/users`) // Replace with your actual API endpoint
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users", error));

    axios.get(`${URL}/AllUser/therapists`) // Replace with your actual API endpoint
      .then(response => setTherapists(response.data))
      .catch(error => console.error("Error fetching therapists", error));
  }, [URL]);

  // Delete user
  const deleteUser = (id) => {
    axios.delete(`${URL}/AllUser/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error("Error deleting user", error));
  };

  // Delete therapist
  const deleteTherapist = (id) => {
    axios.delete(`${URL}/AllUser/therapists/${id}`)
      .then(() => {
        setTherapists(therapists.filter(therapist => therapist.id !== id));
      })
      .catch(error => console.error("Error deleting therapist", error));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Manage Users </h2>
        
        {/* Users Table */}
       
        <table className="table table-bordered table-striped mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-center mb-4">Manage Therapists</h2>
        <table className="table table-bordered table-striped mt-3">
       
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {therapists.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.approvalStatus}</td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => deleteTherapist(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUserList;
