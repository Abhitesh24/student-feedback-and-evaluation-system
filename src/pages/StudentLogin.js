import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import { FaUserGraduate, FaArrowLeft } from 'react-icons/fa';

const StudentLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const success = login(data, 'student');
    setIsLoading(false);

    if (success) {
      navigate('/student/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <FaUserGraduate size={48} color="#28a745" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '0.5rem', color: '#333' }}>Student Login</h2>
          <p style={{ color: '#666', margin: 0 }}>
            Access your student dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <div className="form-error">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && (
              <div className="form-error">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              marginTop: '1rem',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              opacity: isValid && !isLoading ? 1 : 0.6,
              cursor: isValid && !isLoading ? 'pointer' : 'not-allowed'
            }}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login as Student'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #eee'
        }}>
          <Link
            to="/"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '500'
            }}
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>

        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '6px',
          fontSize: '0.875rem',
          color: '#666'
        }}>
          <strong>Demo Credentials:</strong><br />
          Email: student@test.com<br />
          Password: 123456
        </div>
      </Card>
    </div>
  );
};

export default StudentLogin;
