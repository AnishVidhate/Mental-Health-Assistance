import React, { useMemo, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from './context/SessionContext'; // ✅ Import SessionProvider

// Lazy Load Components
const LandingPage = lazy(() => import('./components/LandingPage'));
const Homepage = lazy(() => import('./components/Homepage'));
const ForumPage = lazy(() => import('./components/ForumPage'));
const CreateForum = lazy(() => import('./components/CreateForum'));
const ChatPage = lazy(() => import('./components/ChatPage'));
const Resources = lazy(() => import('./components/Resources'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const TherapistProfile = lazy(() => import('./components/TherapistProfile'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const TherapistList = lazy(() => import('./components/TherapistList'));
const MoodTracker = lazy(() => import('./components/MoodTracker'));
const TherapistHomepage = lazy(() => import('./components/TherapistHomepage'));
const UserSessions = lazy(() => import('./components/UserSessions')); // Import UserSessions

const AppContent = ({ userType }) => {
  const location = useLocation();

  const noNavbarPaths = ['/', '/login', '/register'];
  const showNavbar = !noNavbarPaths.includes(location.pathname) && !location.pathname.startsWith('/therapist/homepage');
  const showFooter = !noNavbarPaths.includes(location.pathname); // Ensure footer is visible on all relevant pages

  return (
    <div className="d-flex flex-column min-vh-100"> {/* Full height container */}
      {showNavbar && <Navbar userType={userType} />}
      
      <div className="main-content flex-grow-1"> {/* Ensures content stretches to push footer */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/forums" element={<ForumPage />} />
            <Route path="/create-forum" element={<CreateForum />} />
            <Route path="/chat/:forumId" element={<ChatPage />} />
            <Route path="/resources" element={<Resources />} />
            
            {/* ✅ Wrap TherapistHomepage and UserSessions with SessionProvider */}
            <Route
              path="/therapist/homepage"
              element={
                <SessionProvider>
                  <TherapistHomepage />
                </SessionProvider>
              }
            />
            <Route
              path="/user-sessions"
              element={
                <SessionProvider>
                  <UserSessions />
                </SessionProvider>
              }
            />

            <Route path="/profile" element={userType === 'therapist' ? <TherapistProfile /> : <UserProfile />} />
            <Route path="/therapists" element={<TherapistList />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
          </Routes>
        </Suspense>
      </div>

      {showFooter && <Footer />} {/* Footer remains at bottom */}
    </div>
  );
};

const App = () => {
  const userType = useMemo(() => localStorage.getItem('userType') || 'user', []);

  return (
    <Router>
      <AppContent userType={userType} />
    </Router>
  );
};

export default App;
