import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaSignOutAlt, FaHome, FaPlus, FaList, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3 style={{ margin: 0, color: '#667eea' }}>Student Feedback System</h3>
            <span style={{
              background: userRole === 'admin' ? '#667eea' : '#28a745',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {userRole === 'admin' ? 'Admin' : 'Student'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {userRole === 'admin' ? (
              <>
                <Link to="/admin/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <FaHome style={{ marginRight: '0.5rem' }} />
                  Dashboard
                </Link>
                <Link to="/admin/create-feedback" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <FaPlus style={{ marginRight: '0.5rem' }} />
                  Create Form
                </Link>
                <Link to="/admin/manage-feedback" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <FaList style={{ marginRight: '0.5rem' }} />
                  Manage Forms
                </Link>
                <Link to="/results" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <FaChartBar style={{ marginRight: '0.5rem' }} />
                  View Results
                </Link>
              </>
            ) : (
              <>
                <Link to="/student/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <FaHome style={{ marginRight: '0.5rem' }} />
                  Dashboard
                </Link>
                <Link to="/student/submit-feedback" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <FaPlus style={{ marginRight: '0.5rem' }} />
                  Submit Feedback
                </Link>
                <Link to="/results" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <FaChartBar style={{ marginRight: '0.5rem' }} />
                  View Results
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
