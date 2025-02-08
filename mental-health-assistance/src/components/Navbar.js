import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = ({ userType }) => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const navItems = userType === 'user' ? [

    { name: 'Homepage', link: '/homepage' },

    { name: 'Community Forums', link: '/forums' },
    { name: 'Resources', link: '/resources' },
    { name: 'Therapists', link: '/therapists' },
    { name: 'Mood Tracker', link: '/mood-tracker' }
  ] : [

    { name: 'Homepage', link: '/therapist/homepage' },

    { name: 'Community Forums', link: '/forums' },
    { name: 'Patients', link: '/patients' },
    { name: 'Reports', link: '/reports' },
    { name: 'Profile', link: '/profile' }
  ];

  return (

    <Navbar expand="lg" className="fixed-top shadow-sm p-3 bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">MindCare</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />


        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item, index) => (
              <Nav.Link
                as={Link}
                to={item.link}
                key={index}
                className={`fw-semibold mx-2 ${location.pathname === item.link ? 'active text-primary' : 'text-dark'}`}
              >
                {item.name}
              </Nav.Link>
            ))}

            {/* Sessions Icon ONLY for Users */}
            {userType === 'user' && (
              <Nav.Link as={Link} to="/user-sessions" className="d-flex align-items-center mx-2">
                <FaCalendarAlt size={24} className={`nav-item ${location.pathname === '/usersessions' ? 'active' : ''}`} style={{ cursor: 'pointer' }} title="Sessions" />
              </Nav.Link>
            )}

            {/* User Profile Dropdown */}
            <Dropdown show={showDropdown} onToggle={handleToggle} align="end">
              <Dropdown.Toggle as="span" onClick={() => setShowDropdown(!showDropdown)} className="nav-link d-flex align-items-center">
                <FaUserCircle size={28} className="text-primary ms-3" style={{ cursor: 'pointer' }} title="Profile" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm rounded">
                <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/login" className="text-danger">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;




