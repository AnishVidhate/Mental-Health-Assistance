import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import Articlephoto from "../images/articles.jpg";
import moodphoto from "../images/moodtrack.jpeg";
import therapyphoto from "../images/therapysession.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section1">
        <div className="overlay">
          <Container className="text-center hero-content">
            <h1 className="animate__animated animate__fadeInDown">
              Welcome to Mental Health Assistance
            </h1>
            <p className="animate__animated animate__fadeIn animate__delay-1s">
              Empowering you with resources, therapy, and a supportive community
              to prioritize your mental well-being.
            </p>
            <div className="cta-buttons animate__animated animate__fadeInUp animate__delay-2s">
              <Button
                variant="outline-light"
                size="lg"
                className="me-3"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                variant="light"
                size="lg"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
            </div>
          </Container>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Our Features</h2>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <img src={Articlephoto} alt="Resource Library" />
                <div className="feature-content">
                  <h3>Resource Library</h3>
                  <p>
                    Access articles, videos, and tools to better understand mental
                    health.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <img src={moodphoto} alt="Mood Tracking" />
                <div className="feature-content">
                  <h3>Mood Tracking</h3>
                  <p>Monitor your daily emotions and gain insights into patterns.</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <img src={therapyphoto} alt="Therapy Sessions" />
                <div className="feature-content">
                  <h3>Therapy Sessions</h3>
                  <p>
                    Book sessions with licensed professionals tailored to your needs.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section text-center py-5">
        <Container>
          <h2 className="mb-4">Start Your Journey Today</h2>
          <p className="mb-4">
            Join our community and take the first step towards better mental
            health.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register')}
            className="btn btn-primary"
          >
            Sign Up Now
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
