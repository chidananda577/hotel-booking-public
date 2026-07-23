import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../components/ApiClient';
import type { Hotel } from '../types';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHotel();
  }, [id]);

  const loadHotel = async () => {
    if (!id) return;

    try {
      const data = await apiClient.getHotelById(parseInt(id));
      setHotel(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load hotel');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!hotel) return;

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date');
      return;
    }

    setLoading(true);
    try {
      await apiClient.createBooking({
        hotelId: hotel.id,
        checkIn,
        checkOut,
      });
      navigate('/bookings');
    } catch (err: any) {
      setError(err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/hotels')} style={styles.backButton}>
        ← Back to Hotels
      </button>

      <div style={styles.card}>
        <h1 style={styles.title}>Book {hotel.name}</h1>
        <p style={styles.location}>
          {hotel.city}, {hotel.country}
        </p>
        <p style={styles.price}>₹{hotel.pricePerNight.toFixed(2)} per night</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Check-in Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Check-out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              min={checkIn || new Date().toISOString().split('T')[0]}
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
  } as React.CSSProperties,
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  } as React.CSSProperties,
  location: {
    color: '#7f8c8d',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '2rem',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  } as React.CSSProperties,
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  } as React.CSSProperties,
  label: {
    fontWeight: 'bold',
    color: '#34495e',
  } as React.CSSProperties,
  input: {
    padding: '0.75rem',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    fontSize: '1rem',
  } as React.CSSProperties,
  button: {
    padding: '1rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  } as React.CSSProperties,
  error: {
    color: '#e74c3c',
    padding: '0.75rem',
    backgroundColor: '#fadbd8',
    borderRadius: '4px',
  } as React.CSSProperties,
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
  } as React.CSSProperties,
};

export default BookingPage;
