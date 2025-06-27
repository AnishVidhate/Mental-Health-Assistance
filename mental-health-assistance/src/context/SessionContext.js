import React, { createContext, useContext, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionRequests, setSessionRequests] = useState([

    {
      id: 1,
      patientName: "John Doe",
      requestedDate: "2023-10-15",
      description: "Anxiety management session"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      requestedDate: "2023-10-16",
      description: "Stress coping strategies"
    }

  ]);
  const [scheduledSessions, setScheduledSessions] = useState([]);

  const scheduleSession = (sessionDetails) => {
    setScheduledSessions([...scheduledSessions, sessionDetails]);
    setSessionRequests(sessionRequests.filter(req => req.id !== sessionDetails.id));
  };

  const rescheduleSession = (sessionId, updatedDetails) => {
    setScheduledSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === sessionId ? { ...session, ...updatedDetails } : session
      )
    );
  };

  return (
    <SessionContext.Provider value={{ sessionRequests, scheduledSessions, scheduleSession, rescheduleSession }}>
      {children}
    </SessionContext.Provider>
  );
};

//  Corrected: Create a custom hook
export const useSessionContext = () => {
  return useContext(SessionContext);
};
