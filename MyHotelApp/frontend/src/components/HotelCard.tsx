import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{hotel.name}</h3>
      <p style={styles.location}>
        {hotel.city}, {hotel.country}
      </p>
      <p style={styles.price}>₹{hotel.pricePerNight.toFixed(2)}/night</p>
      {hotel.description && (
        <p style={styles.description}>
          {hotel.description.substring(0, 100)}
          {hotel.description.length > 100 && '...'}
        </p>
      )}
      <div style={styles.actions}>
        <button
          onClick={() => navigate(`/hotels/${hotel.id}`)}
          style={styles.viewButton}
        >
          View Details
        </button>
        <button
          onClick={() => navigate(`/book/${hotel.id}`)}
          style={styles.bookButton}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  } as React.CSSProperties,
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  } as React.CSSProperties,
  location: {
    color: '#7f8c8d',
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '1rem',
  } as React.CSSProperties,
  description: {
    color: '#34495e',
    marginBottom: '1rem',
    lineHeight: '1.5',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: '1rem',
  } as React.CSSProperties,
  viewButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  } as React.CSSProperties,
  bookButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  } as React.CSSProperties,
};

export default HotelCard;
