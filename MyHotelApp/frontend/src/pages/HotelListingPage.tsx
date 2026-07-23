import React, { useState, useEffect } from 'react';
import { apiClient } from '../components/ApiClient';
import HotelCard from '../components/HotelCard';
import type { Hotel } from '../types';

const HotelListingPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async (query?: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await apiClient.searchHotels(query);
      setHotels(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadHotels(searchQuery);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Your Perfect Hotel</h1>

      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by city, name, or country..."
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>
          Search
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {loading && <div style={styles.loading}>Loading hotels...</div>}

      {!loading && hotels.length === 0 && (
        <div style={styles.noResults}>No hotels found</div>
      )}

      <div style={styles.grid}>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
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
  searchForm: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  } as React.CSSProperties,
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    fontSize: '1rem',
  } as React.CSSProperties,
  searchButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  } as React.CSSProperties,
  error: {
    color: '#e74c3c',
    padding: '1rem',
    backgroundColor: '#fadbd8',
    borderRadius: '4px',
    marginBottom: '1rem',
  } as React.CSSProperties,
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d',
  } as React.CSSProperties,
  noResults: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  } as React.CSSProperties,
};

export default HotelListingPage;
