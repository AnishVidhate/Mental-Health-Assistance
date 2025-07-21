import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../Config/Config";
export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionRequests, setSessionRequests] = useState([]);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  
  const userStr=localStorage.getItem("user");
  const user= userStr ? JSON.parse(userStr) : null;
  const therapistId = user.id; 
  const URL = config.BaseURL;

  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${URL}/Sessions/${therapistId}`);
      const sessions = Array.isArray(res.data) ? res.data : [res.data];

      const enrichedSessions = await Promise.all(
        sessions.map(async (session) => {
          const userRes = await axios.get(`${URL}/users/${session.userId}`);
          const patient = userRes.data;

          const dateTime = new Date(session.dateTime);
          const date = dateTime.toISOString().split("T")[0];
          const time = dateTime.toTimeString().split(":").slice(0, 2).join(":");

          return {
            id: session.id,
            userId: session.userId,
            patientName: patient.name,
            title: session.title || "",
            date,
            time,
            description: `Status: ${session.status}`,
            sessionInfo: session,
            patientInfo: patient,
            status: session.status,
          };
        })
      );

      setSessionRequests(
        enrichedSessions.filter((s) => s.status === "Pending")
      );
      setScheduledSessions(
        enrichedSessions.filter((s) => s.status === "Scheduled")
      );
    } catch (error) {
      console.error("Error fetching sessions or users:", error);
    }
  };
  useEffect(() => {
    fetchSessions();
  }, [therapistId]);

  const rescheduleSession = (sessionId, updatedData) => {
    setScheduledSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, ...updatedData } : s))
    );
  };

  const scheduleSession = async (sessionId, updatedData) => {
    try {
      await axios.put(`${URL}/Sessions/schedule/${sessionId}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error scheduling session:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessionRequests,
        scheduledSessions,
        scheduleSession,
        rescheduleSession,
        fetchSessions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
