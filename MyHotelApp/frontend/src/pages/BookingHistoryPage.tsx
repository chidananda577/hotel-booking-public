import React, { useState, useEffect } from 'react';
import { apiClient } from '../components/ApiClient';
import type { Booking } from '../types';

const BookingHistoryPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await apiClient.getMyBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await apiClient.cancelBooking(bookingId);
      loadBookings();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel booking');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading bookings...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Bookings</h1>

      {error && <div style={styles.error}>{error}</div>}

      {bookings.length === 0 && (
        <div style={styles.noBookings}>
          You have no bookings yet. Start exploring hotels to make your first booking!
        </div>
      )}

      <div style={styles.grid}>
        {bookings.map((booking) => (
          <div key={booking.id} style={styles.card}>
            <h3 style={styles.hotelName}>{booking.hotelName}</h3>
            <div style={styles.details}>
              <p>
                <strong>Booking ID:</strong> #{booking.id}
              </p>
              <p>
                <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}
              </p>
              <p>
                <strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    ...styles.status,
                    color: booking.status === 'CONFIRMED' ? '#27ae60' : '#e74c3c',
                  }}
                >
                  {booking.status}
                </span>
              </p>
            </div>

            {booking.status === 'CONFIRMED' && (
              <button
                onClick={() => handleCancel(booking.id)}
                style={styles.cancelButton}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  } as React.CSSProperties,
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50',
  } as React.CSSProperties,
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
  } as React.CSSProperties,
  error: {
    color: '#e74c3c',
    padding: '1rem',
    backgroundColor: '#fadbd8',
    borderRadius: '4px',
    marginBottom: '1rem',
  } as React.CSSProperties,
  noBookings: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
  } as React.CSSProperties,
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  hotelName: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  } as React.CSSProperties,
  details: {
    marginBottom: '1rem',
    lineHeight: '1.8',
  } as React.CSSProperties,
  status: {
    fontWeight: 'bold',
  } as React.CSSProperties,
  cancelButton: {
    padding: '0.75rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  } as React.CSSProperties,
};

export default BookingHistoryPage;
