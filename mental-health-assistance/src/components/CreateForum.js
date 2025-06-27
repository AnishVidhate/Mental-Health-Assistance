import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../Config/Config";
const CreateForum = () => {

  const URL=config.BaseURL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const forumData = {
      title,
      description,
      createdBy: 1, // Replace with actual user ID
    };

    try {
      const response = await axios.post(`${URL}/CreateForums`, forumData);
      
      if (response.status === 201) {
        navigate("/forums");
      }
    } catch (error) {
      console.error("Error creating forum:", error.response?.data || error.message);
    }
  };

  return (
    <div className="create-forum container mt-4">
      <h2 className="text-center mb-4">Create a New Forum</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Forum Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Forum Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">Create Forum</button>
      </form>
    </div>
  );
};

export default CreateForum;
