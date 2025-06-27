import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import config from '../Config/Config';
const AdminHomepage = () => {
  const URL =config.BaseURL;
  const [requestedTherapists, setRequestedTherapists] = useState([]);
  const [hiddenTherapists] = useState(new Set()); 
  const [currentPage, setCurrentPage] = useState(1);
  const therapistsPerPage = 5; // Pagination limit

const fetchTherapists = useCallback(async () => {
  try {
    const response = await axios.get(`${URL}/Therapist/pending`);
    setRequestedTherapists(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}, [URL]);

useEffect(() => {
  fetchTherapists();
}, [fetchTherapists]);
  const handleAccept = async (id) => {
    try {
     
      await axios.put(`${URL}/Therapist/${id}/approve`);
      setRequestedTherapists(requestedTherapists.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error inserting therapist:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${URL}/Therapist/${id}`);
      setRequestedTherapists(requestedTherapists.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting therapist:", error);
    }
  };

  // Filter out hidden therapists for display
  const visibleTherapists = requestedTherapists.filter((t) => !hiddenTherapists.has(t.id));

  // Pagination Logic
  const indexOfLastTherapist = currentPage * therapistsPerPage;
  const indexOfFirstTherapist = indexOfLastTherapist - therapistsPerPage;
  const currentTherapists = visibleTherapists.slice(indexOfFirstTherapist, indexOfLastTherapist);

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="text-center pt-5 mt-5 mb-4">Requested Therapists</h2>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>License No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTherapists.map((therapist, index) => (
              <tr key={index}>
                <td>{therapist.name}</td>
                <td>{therapist.email}</td>
                <td>{therapist.licenseNumber}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => handleAccept(therapist.id)}>
                    Accept
                  </button>
                  <button className="btn btn-danger" onClick={() => handleReject(therapist.id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            disabled={indexOfLastTherapist >= visibleTherapists.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
