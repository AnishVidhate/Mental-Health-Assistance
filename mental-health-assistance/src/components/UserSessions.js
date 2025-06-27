import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form, Toast, ToastContainer, Alert } from "react-bootstrap";
import config from "../Config/Config";
const UserSessions = () => {

  const URL=config.BaseURL;
  const [showModal, setShowModal] = useState(false);
  const [preferredDateTime, setPreferredDateTime] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id;

        if (!userId) {
          setError("User not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${URL}/Sessions/user/${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Subscribe first");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [URL]);

  // Open the modal and set selected session
  const handleShow = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedSession(null);
  };

  // Handle Send Request for rescheduling
  const handleSendRequest = async () => {
    if (!selectedSession) return;

    try {
      const updateData = {
        ...selectedSession,
        DateTime: preferredDateTime,
        Status: "Pending", // Change status to pending since it's an edit request
      };

      await axios.put(`${URL}/Sessions/${selectedSession.id}`, updateData);
      setShowToast(true); // Show success notification
      setShowModal(false);

      // Refresh sessions after update
      setAppointments((prev) =>
        prev.map((session) => (session.id === selectedSession.id ? { ...session, DateTime: preferredDateTime, Status: "Pending" } : session))
      );
    } catch (error) {
      console.error("Error updating session:", error);
      alert("Failed to request a new appointment time.");
    }
  };

  // Get today's date and time in YYYY-MM-DDTHH:MM format (for datetime-local)
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16); // Prevents past date/time selection

  return (
    <Container className="mt-4 main-content">
      <h2 className="mb-4 text-primary">Your Upcoming Sessions</h2>

      {loading ? (
        <Alert variant="info">Loading sessions...</Alert>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : appointments.length === 0 ? (
        <Alert variant="warning">You have no upcoming sessions.</Alert>
      ) : (
        <Table striped bordered hover className="shadow-sm">
          <thead className="table-info text-center">
            <tr>
              <th>Therapist Name</th>
              <th>Scheduled Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.therapistName}</td>
                <td>{new Date(appointment.dateTime).toLocaleString()}</td>
                <td>
                  <span className={`badge ${appointment.status === "Scheduled" ? "bg-success" : "bg-warning text-dark"}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShow(appointment)}
                    disabled={appointment.status === "Pending"}
                  >
                    Request Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Request Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request a New Appointment Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                min={minDateTime} // Disables past dates & times
                onChange={(e) => setPreferredDateTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSendRequest} disabled={!preferredDateTime}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Header>
            <strong className="me-auto text-white">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Request to change appointment sent successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default UserSessions;
