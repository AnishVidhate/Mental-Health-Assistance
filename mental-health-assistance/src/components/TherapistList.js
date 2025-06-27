import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Modal } from "react-bootstrap";
import RazorpayButton from "./RazorpayButton";
import config from "../Config/Config";


const TherapistList = () => {

  const URL=config.BaseURL;
  const [therapists, setTherapists] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get(`${URL}/Therapist`);
        setTherapists(response.data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };

    fetchTherapists();
  }, [URL]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      if (!userId) {
        console.error("No user ID found in localStorage");
        return;
      }

      try {
        const response = await axios.get(`${URL}/SubscriptionControllerCheck/check/${userId}`);
        setIsSubscribed(response.data === true);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
        setIsSubscribed(false);
      }
    };

    fetchSubscriptionStatus();
  }, [URL]);

  const handleRequestSession = async (therapist) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (!userId) {
      alert("User not found! Please log in.");
      return;
    }

    const sessionData = {
      UserId: userId,
      TherapistId: therapist.id,
      TherapistName: therapist.name,
      DateTime: new Date().toISOString(),
      Status: "Pending",
    };

    try {
      const response = await axios.post(`${URL}/Sessions/create`, sessionData);
      if (response.status === 201) {
        alert(`Session request sent successfully to ${therapist.name}`);
      }
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to request session. Please try again.");
    }
  };

  const handleButtonClick = (therapist) => {
    if (!isSubscribed) {
      setSelectedTherapist(therapist);
      setShowModal(true);
    } else {
      handleRequestSession(therapist);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTherapist(null);
  };

  return (
    <Container className="therapist-list mt-5">
      <h2 className="text-center mb-4">Available Therapists</h2>
      <Row>
        {therapists.map((therapist) => (
          <Col key={therapist.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={therapist.image || "https://cdn-icons-png.flaticon.com/512/3063/3063015.png"}
                alt={therapist.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                  display: "block",
                  margin: "15px auto",
                }}
              />
              <Card.Body>
                <Card.Title>{therapist.name}</Card.Title>
                <Card.Text>
                  <strong>Specialization:</strong> {therapist.specialization}
                  <br />
                  <strong>Experience:</strong> {therapist.yearsOfExperience} years
                  <br />
                </Card.Text>
                <Button
                  variant={isSubscribed ? "success" : "danger"}
                  className="w-100"
                  onClick={() => handleButtonClick(therapist)}
                >
                  {isSubscribed ? "Request Session" : "Subscribe to Request"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Subscription Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Oops! Subscription Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to subscribe to book a session with {selectedTherapist?.name}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <RazorpayButton />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TherapistList;
