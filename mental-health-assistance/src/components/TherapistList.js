import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import RazorpayButton from "./RazorpayButton";
import config from "../Config/Config";

const TherapistList = () => {
  const URL = config.BaseURL;
  const [therapists, setTherapists] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState("");

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
        const response = await axios.get(
          `${URL}/SubscriptionControllerCheck/check/${userId}`
        );
        setIsSubscribed(response.data === true);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
        setIsSubscribed(false);
      }
    };

    fetchSubscriptionStatus();
  }, [URL]);

  const handleScheduleSession = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (!userId || !selectedTherapist || !selectedDateTime) {
      alert("Missing data to schedule session.");
      return;
    }

    const sessionData = {
      userId: userId,
      therapistId: selectedTherapist.id,
      therapistName: selectedTherapist.name,
      dateTime: selectedDateTime,
      status: "Scheduled",
    };

    try {
      const response = await axios.post(
        `${URL}/Sessions/create`,
        sessionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Session scheduled successfully!");
        setShowScheduleModal(false);
        setSelectedDateTime("");
      } else {
        alert("Failed to schedule session.");
      }
    } catch (error) {
      console.error("Error scheduling session:", error);
      alert("Failed to schedule session.");
    }
  };

  const handleButtonClick = (therapist) => {
    if (!isSubscribed) {
      setSelectedTherapist(therapist);
      setShowSubscribeModal(true);
    } else {
      setSelectedTherapist(therapist);
      setShowScheduleModal(true);
    }
  };

  const closeSubscribeModal = () => {
    setShowSubscribeModal(false);
    setSelectedTherapist(null);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
    setSelectedDateTime("");
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
                src={
                  therapist.image ||
                  "https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                }
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
                </Card.Text>
                <Button
                  variant={isSubscribed ? "success" : "danger"}
                  className="w-100"
                  onClick={() => handleButtonClick(therapist)}
                >
                  {isSubscribed ? "Schedule Session" : "Subscribe to Request"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Subscription Modal */}
      <Modal show={showSubscribeModal} onHide={closeSubscribeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Oops! Subscription Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You need to subscribe to book a session with{" "}
            {selectedTherapist?.name}.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSubscribeModal}>
            Close
          </Button>
          <RazorpayButton />
        </Modal.Footer>
      </Modal>

      {/* Scheduling Modal */}
      <Modal show={showScheduleModal} onHide={closeScheduleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Schedule Session with {selectedTherapist?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="dateTimeInput">
              <Form.Label>Select Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeScheduleModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleScheduleSession}>
            Schedule
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TherapistList;
