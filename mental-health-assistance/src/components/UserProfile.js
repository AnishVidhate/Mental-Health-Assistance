import React, { useState } from "react";
import { Container, Form, Button, Card, Navbar } from "react-bootstrap";

const UserProfile = () => {
  const storedUser= localStorage.getItem('user');
  const userName=JSON.parse(storedUser).name;
  const userEmail= JSON.parse(storedUser).email;
  // Fetch name and email from localStorage
  const [profile, setProfile] = useState({
    name: userName ,
    email:userEmail 
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);

    // Update localStorage
    localStorage.setItem("userName", profile.name);
    localStorage.setItem("userEmail", profile.email);
    
  };

  return (
    <div>
    <Container className="user-profile mt-5 d-flex justify-content-center">
      <Card className="shadow-lg p-4" style={{ width: "50%", borderRadius: "15px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">My Profile</h2>

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
              <Button variant="primary" type="submit" className="me-2">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <div className="profile-info text-center">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
              </div>
              <div className="text-center">
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
};

export default UserProfile;
