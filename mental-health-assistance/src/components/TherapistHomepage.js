import React, { useState, useContext } from "react";
import { Container, Button, Table, Modal, Form } from "react-bootstrap";
import TherapistNavbar from "./TherapistNavbar";
import { SessionContext } from "../context/SessionContext";
import "./Homepage.css";

const TherapistHomepage = () => {
  const { sessionRequests, scheduleSession } = useContext(SessionContext);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    description: ""
  });

  const handleCreateSession = (request) => {
    setSelectedRequest(request);
    setShowCreateModal(true);
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    
    // Create session object
    const newScheduledSession = {
      id: selectedRequest.id, // Use the same ID to track it
      patientName: selectedRequest.patientName,
      title: newSession.title,
      date: newSession.date,
      time: newSession.time,
      description: newSession.description
    };

    // Schedule the session and remove from requests
    scheduleSession(newScheduledSession);
    
    // Close modal and reset form
    setShowCreateModal(false);
    setNewSession({ title: "", date: "", time: "", description: "" });
  };

  return (
    <>
      <TherapistNavbar />
      <Container className="therapist-homepage">
      <h2 className="text-center mt-5 mb-4 pt-5">Session Requests</h2>

        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Requested Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessionRequests.length > 0 ? (
              sessionRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.patientName}</td>
                  <td>{request.requestedDate}</td>
                  <td>{request.description}</td>
                  <td>
                    <Button 
                      variant="primary"
                      onClick={() => handleCreateSession(request)}
                    >
                      Create Session
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No session requests available.</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Session for {selectedRequest?.patientName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSessionSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Session Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newSession.title}
                  onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newSession.description}
                  onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Schedule Session
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default TherapistHomepage;