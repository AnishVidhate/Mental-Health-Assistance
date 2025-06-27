import React, { useState, useEffect } from "react";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TherapistNavbar from "./TherapistNavbar";
import config from "../Config/Config";
const TherapistProfile = () => {
  const URL = config.BaseURL;
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    specialization: "",
    yearsOfExperience: "",
    licenseNumber: "",
    // bio: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const storedUser = localStorage.getItem("user");
  const therapist = storedUser ? JSON.parse(storedUser) : null;
  const therapistId = therapist?.id;

  useEffect(() => {
    
    if (!therapistId) {
      setError("Therapist ID not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${URL}/Therapist/${therapistId}`);
        
        setProfile(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile. Please check API and therapist ID.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [therapistId, URL]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await axios.put(`${URL}/Therapist/${therapistId}`, profile);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <>
      <TherapistNavbar />
      <Container className="therapist-profile">
        <h2 className="text-center mt-4 pt-5">My Profile</h2>

        {loading ? (
          <Spinner animation="border" className="d-block mx-auto" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            {isEditing ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control
                    type="number"
                    name="yearsOfExperience"
                    value={profile.yearsOfExperience}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>License Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control as="textarea" rows={3} name="bio" value={profile.bio} onChange={handleChange} />
                </Form.Group> */}
                <Button variant="primary" type="submit" className="me-2">
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <div className="profile-info">
                  <p>
                    <strong>Name:</strong> {profile.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {profile.specialization}
                  </p>
                  <p>
                    <strong>Years of Experience:</strong>{" "}
                    {profile.yearsOfExperience}
                  </p>
                  <p>
                    <strong>License Number:</strong> {profile.licenseNumber}
                  </p>
                </div>
                <div className="profile-actions">
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/therapist/homepage")}
                    className="back-button"
                  >
                    Back to Home
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default TherapistProfile;
