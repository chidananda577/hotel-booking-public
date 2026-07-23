import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../components/ApiClient';
import type { Hotel } from '../types';

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
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
      setError(err.message || 'Failed to load hotel details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading hotel details...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!hotel) {
    return <div style={styles.error}>Hotel not found</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/hotels')} style={styles.backButton}>
        ← Back to Hotels
      </button>

      <div style={styles.card}>
        <h1 style={styles.title}>{hotel.name}</h1>
        <p style={styles.location}>
          {hotel.city}, {hotel.country}
        </p>
        <p style={styles.price}>₹{hotel.pricePerNight.toFixed(2)} per night</p>

        {hotel.description && (
          <div style={styles.description}>
            <h2 style={styles.sectionTitle}>About</h2>
            <p>{hotel.description}</p>
          </div>
        )}

        <button
          onClick={() => navigate(`/book/${hotel.id}`)}
          style={styles.bookButton}
        >
          Book This Hotel
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
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
    fontSize: '1.2rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '2rem',
  } as React.CSSProperties,
  description: {
    marginBottom: '2rem',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  } as React.CSSProperties,
  bookButton: {
    padding: '1rem 2rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    width: '100%',
  } as React.CSSProperties,
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
  } as React.CSSProperties,
  error: {
    color: '#e74c3c',
    padding: '2rem',
    textAlign: 'center',
  } as React.CSSProperties,
};

export default HotelDetailsPage;
