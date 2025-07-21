import React, { useState,useEffect } from "react";
import { useSessionContext } from "../context/SessionContext";
import { Container, Table, Button, Alert, Modal, Toast, ToastContainer } from "react-bootstrap";
import TherapistHomepage from "./TherapistHomepage";
import TherapistNavbar from "./TherapistNavbar";

const ScheduledSessions = () => {
  const { scheduledSessions,fetchSessions } = useSessionContext();

  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchSessions(); 
  }, []);

  const handleShow = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedSession(null);
    setShowModal(false);
  };

  const handleSendConfirmation = () => {
    setShowModal(false);
    setShowToast(true);
  };

  return (
    <div>

    <TherapistNavbar/>
    <Container className="mt-4 main-content">
      <h2 className="mb-4 text-primary">Scheduled Sessions</h2>

      {scheduledSessions.length === 0 ? (
        <Alert variant="warning">No scheduled sessions.</Alert>
      ) : (
        <Table striped bordered hover className="shadow-sm">
          <thead className="table-info text-center">
            <tr>
              <th>Patient Name</th>
              <th>Scheduled Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {scheduledSessions.map((session) => (
              <tr key={session.id}>
                <td>{session.patientName}</td>
                <td>{`${session.date} ${session.time}`}</td>
                <td>
                  <span className={`badge ${session.status === "Scheduled" ? "bg-success" : "bg-warning text-dark"}`}>
                    {session.status}
                  </span>
                </td>
                <td>
                  <Button variant="info" onClick={() => handleShow(session)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Session Details Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Session Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSession && (
            <>
              <p><strong>Patient:</strong> {selectedSession.patientName}</p>
              <p><strong>Date:</strong> {selectedSession.date}</p>
              <p><strong>Time:</strong> {selectedSession.time}</p>
              <p><strong>Status:</strong> {selectedSession.status}</p>
              <p><strong>Title:</strong> {selectedSession.title || "N/A"}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSendConfirmation}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Header>
            <strong className="me-auto text-white">Confirmed</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Session confirmed successfully.</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
        </div>
  );
};

export default ScheduledSessions;
