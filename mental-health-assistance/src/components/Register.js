
import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import config from "../Config/Config";
const RegisterPage = () => {

  const URL= config.BaseURL;
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let userData = { name, email, password, role };
    let apiUrl = `${URL}/Register`; // Default for normal users

    if (role === "therapist") {
      userData = {
        name,
        email,
        password,
        specialization,
        yearsOfExperience: parseInt(experience, 10),
        licenseNumber
      };
      apiUrl =  `${URL}/Register/therapist`; // Therapist API
    }

    try {
      const response = await axios.post(apiUrl, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Registration successful!");

        // Redirect based on role
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="register-page d-flex justify-content-center align-items-center">
      <Form className="register-form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Register</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Select Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="therapist">Therapist</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </Form.Group>

        {role === "therapist" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Years of Experience</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter license number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}

        <Button variant="success" type="submit" className="w-100" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </Form>
    </Container>
  );
};

export default RegisterPage;
