import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminProfile = () => {
  const storedUser=localStorage.getItem('user');
  const userName= JSON.parse(storedUser).name;
  const userEmail= JSON.parse(storedUser).email;
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: userName,
    email: userEmail
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
  };

  return (
    <>
      <AdminNavbar />
      <Container className="admin-profile">
        <h2 className="text-center pt-5 mt-5">Admin Profile</h2>
        
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
            <div className="profile-info">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              
            </div>
            <div className="profile-actions mt-5">
                <Button 
                    variant="secondary" 
                    onClick={() => navigate('/admin/adminhomepage')}
                    className="back-button"
                    >
                    Back to Home
                </Button>
                </div>

            </>
        )}
      </Container>
    </>
  );
};

export default AdminProfile;
