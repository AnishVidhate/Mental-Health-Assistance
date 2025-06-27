import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../Config/Config";
const ForumPage = () => {
  const URL = config.BaseURL;
  const [forums, setForums] = useState([]);

useEffect(() => {
  const fetchForums = async () => {
    try {
      const response = await axios.get(`${URL}/CreateForums`);
      setForums(response.data);
    } catch (error) {
      console.error("Error fetching forums:", error.response?.data || error.message);
    }
  };

  fetchForums();
}, [URL]); 


  return (
    <div className="forum-page container mt-4">
      <h2 className="text-center mb-4">Forums</h2>
      <Link to="/create-forum" className="btn btn-primary mb-3">
        Create Forum
      </Link>
      <ul className="list-group">
        {forums.length > 0 ? (
          forums.map((forum) => (
            <li
              key={forum.id}
              className="list-group-item mb-3 p-3 shadow-sm rounded"
            >
              <h5>{forum.title}</h5>
              <p>{forum.description}</p>
              <Link
                to={`/chat/${forum.id}`}
                className="btn btn-outline-primary btn-sm mt-2"
              >
                Chat
              </Link>
            </li>
          ))
        ) : (
          <p>No forums available.</p>
        )}
      </ul>
    </div>
  );
};

export default ForumPage;
