import React, { useMemo, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from './context/SessionContext';
import AdminHomepage from './components/AdminHomepage';
import AdminProfile from './components/AdminProfile';
import UserList from './components/UserList';

// Lazy Load Components for Performance
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
const UserSessions = lazy(() => import('./components/UserSessions'));
const ScheduledSessions = lazy(() => import('./components/ScheduledSessions'));

const AppContent = ({ userType }) => {
  const location = useLocation();

  const noNavbarPaths = ['/', '/login', '/register'];
  const showNavbar = !noNavbarPaths.includes(location.pathname) && !location.pathname.startsWith('/therapist/homepage') && !location.pathname.startsWith('/admin/');
  const showFooter = !noNavbarPaths.includes(location.pathname);

  return (
    <SessionProvider> {/* Wrap the entire app content inside SessionProvider */}
      <div className="d-flex flex-column min-vh-100"> {/* Full height container */}
        <Routes><Route path="/" element={<LandingPage />} /></Routes>
        {showNavbar && <Navbar userType={userType} />}

        <div className="main-content flex-grow-1"> {/* Pushes footer to the bottom */}
          <Suspense fallback={<div>Loading...</div>}>
            
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/forums" element={<ForumPage />} />
              <Route path="/create-forum" element={<CreateForum />} />
              <Route path="/chat/:forumId" element={<ChatPage />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/therapist/homepage" element={<TherapistHomepage />} />
              <Route path="/profile" element={userType === 'therapist' ? <TherapistProfile /> : <UserProfile />} />
              <Route path="/therapists" element={<TherapistList />} />
              <Route path="/mood-tracker" element={<MoodTracker />} />
              <Route path="/user-sessions" element={<UserSessions />} />
              <Route path="/therapist/scheduled" element={<ScheduledSessions />} />
              <Route path="/therapist/therapistprofile" element={<TherapistProfile />} />
              <Route path="/admin/adminhomepage" element={<AdminHomepage />} />
              <Route path="/admin/adminprofile" element={<AdminProfile />} />
              <Route path="/admin/requestedtherapist" element={<AdminHomepage />} />
              <Route path="/admin/userslist" element={<UserList />} />
            </Routes>
          </Suspense>
        </div>

        {showFooter && <Footer />} {/* Footer remains at the bottom */}
      </div>
    </SessionProvider>
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
