import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HotelListingPage from './pages/HotelListingPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import BookingPage from './pages/BookingPage';
import BookingHistoryPage from './pages/BookingHistoryPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={styles.app}>
          <NavBar />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<Navigate to="/hotels" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/hotels" element={<HotelListingPage />} />
              <Route path="/hotels/:id" element={<HotelDetailsPage />} />
              <Route
                path="/book/:id"
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingHistoryPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
  } as React.CSSProperties,
  main: {
    minHeight: 'calc(100vh - 80px)',
  } as React.CSSProperties,
};

export default App;
