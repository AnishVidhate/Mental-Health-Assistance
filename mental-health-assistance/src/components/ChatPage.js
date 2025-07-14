import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from '../Config/Config';
import axios from "axios";

const ChatPage = () => {
  const { forumId } = useParams(); // Extract forum ID from URL
  const [forumDetails] = useState({
    title: "Sample Forum Title",
    description:
      "This is a description of the forum where people can discuss mental health topics.",
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const API_BASE_URL = config.BaseURL;

  // Fetch chats from API
useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Chats/${forumId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  fetchMessages();
}, [forumId]);

  // Send new message via POST API
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messagePayload = {
      forumId: parseInt(forumId),
      userId: 2, // Replace with actual logged-in user's ID
      message: newMessage,
    };


    try {
      await axios.post(`${API_BASE_URL}/Chats`, messagePayload);
      // Re-fetch messages after sending
      const response = await axios.get(`${API_BASE_URL}/Chats/${forumId}`);
      setMessages(response.data);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-page container mt-4">
      <h2 className="text-center mb-4">{forumDetails.title}</h2>
      <p>{forumDetails.description}</p>

      <div className="new-message mt-4">
        <textarea
          className="form-control mb-2"
          rows="3"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        ></textarea>
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>

      <br />
      <br />

      <div className="chat-section">
        <h5>Chats</h5>
        <div className="messages-list">
          {messages.length > 0 ? (
            messages.map((resp, index) => (
              <div
                key={index}
                className="message-item border rounded p-3 mb-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <p className="mb-1">{resp.message}</p>
              </div>
            ))
          ) : (
            <p>No chats available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
