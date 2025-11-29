import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <FaExclamationTriangle size={64} color="#ffc107" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          404
        </h1>
        <h2 style={{
          marginBottom: '1rem',
          color: '#666'
        }}>
          Page Not Found
        </h2>
        <p style={{
          marginBottom: '2rem',
          color: '#888',
          lineHeight: '1.6'
        }}>
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the home page.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}
        >
          <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}>
            <FaHome /> Go to Home
          </button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
