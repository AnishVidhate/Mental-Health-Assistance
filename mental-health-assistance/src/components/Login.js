

import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import config from "../Config/Config";
const Login = () => {

  const URL=config.BaseURL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiUrl = `${URL}/Login`; // Unified login API for all roles

    try {
      const response = await axios.post(apiUrl, { email, password }, { withCredentials: false });

      if (!response.data.role) {
        throw new Error("Invalid role received from server.");
      }
      
      localStorage.setItem("user", JSON.stringify(response.data));
      
      switch (response.data.role.toLowerCase()) {
        case "admin":
          navigate("/admin/requestedtherapist");
          break;
        case "user":
          navigate("/homepage");
          break;
        case "therapist":
          navigate("/therapist/homepage");
          break;
        default:
          setError("Unknown role received.");
      }
    } catch (err) {
      setError(err.response?.data || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="login-page d-flex justify-content-center align-items-center">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Welcome Back</h3>

        {error && <Alert variant="danger">{error}</Alert>}

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

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login"}
        </Button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Button variant="link" onClick={() => navigate("/register")}>
            Register here
          </Button>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
