import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const contactInfo = {
    address: '123 Wellness Street, MindCity',
    email: 'support@mindcare.com',
    phone: '+1 (234) 567-8900',
  };

  return (
    <footer className="footer">
      <Container>

        <Row className="text-center text-md-start align-items-center">
          {/* About Section */}
          <Col md={4} className="mb-3">
            <h5>About MindCare</h5>
            <p>
              MindCare provides mental wellness solutions through expert guidance and innovative technology, ensuring accessible and compassionate care for all.
            </p>
          </Col>
          <Col md={1}>
          </Col>
          {/* Contact Info Section */}
          <Col md={4} className="mb-3">
            <h5>Get in Touch</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center">
                <FaMapMarker className="me-2 text-success" aria-label="Location" />
                {contactInfo.address}
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="me-2 text-success" aria-label="Email" />
                <a href={`mailto:${contactInfo.email}`} className="footer-link">{contactInfo.email}</a>
              </li>
              <li className="d-flex align-items-center">
                <FaPhone className="me-2 text-success" aria-label="Phone" />
                <a href={`tel:${contactInfo.phone}`} className="footer-link">{contactInfo.phone}</a>
              </li>
            </ul>
          </Col>

          {/* Quick Links Section */}
          <Col md={3} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/homepage" className="footer-link">Home</Link></li>
              <li><Link to="/therapists" className="footer-link">Find a Therapist</Link></li>
              <li><Link to="/mood-tracker" className="footer-link">Mood Tracker</Link></li>
              <li><Link to="/forums" className="footer-link">Community Forums</Link></li>
            </ul>
          </Col>
        </Row>

        {/* Copyright */}
        <div className="text-center mt-3 small-text">

          <p className="mb-0">
            &copy; {new Date().getFullYear()} MindCare. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;