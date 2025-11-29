import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { FaUserShield, FaUserGraduate, FaChartBar, FaClipboardList, FaStar, FaLock } from 'react-icons/fa';

const Landing = () => {
  const features = [
    {
      icon: <FaClipboardList size={32} color="#667eea" />,
      title: 'Easy Form Creation',
      description: 'Admins can create comprehensive feedback forms with multiple question types including ratings and comments.'
    },
    {
      icon: <FaUserGraduate size={32} color="#28a745" />,
      title: 'Student-Friendly Interface',
      description: 'Students can easily submit feedback through an intuitive and responsive interface.'
    },
    {
      icon: <FaChartBar size={32} color="#ffc107" />,
      title: 'Real-time Analytics',
      description: 'View aggregated results with beautiful charts and detailed insights into feedback data.'
    },
    {
      icon: <FaLock size={32} color="#dc3545" />,
      title: 'Secure & Private',
      description: 'All data is stored locally with proper authentication and role-based access control.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            Student Feedback & Evaluation System
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            A comprehensive platform for collecting, managing, and analyzing student feedback
            to improve educational quality and student satisfaction.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/admin/login"
              style={{ textDecoration: 'none' }}
            >
              <button className="btn btn-primary" style={{
                background: 'white',
                color: '#667eea',
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaUserShield /> Admin Login
              </button>
            </Link>
            <Link
              to="/student/login"
              style={{ textDecoration: 'none' }}
            >
              <button className="btn btn-primary" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaUserGraduate /> Student Login
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#333'
            }}>
              Powerful Features
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to collect meaningful feedback and gain valuable insights
            </p>
          </div>

          <div className="grid grid-2">
            {features.map((feature, index) => (
              <Card key={index} style={{
                textAlign: 'center',
                padding: '2rem',
                height: '100%'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '4rem 1rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#333'
            }}>
              How It Works
            </h2>
          </div>

          <div className="grid grid-3">
            <Card style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '0 auto 1rem auto'
              }}>
                1
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>
                Admin Creates Forms
              </h3>
              <p style={{ color: '#666' }}>
                Administrators design feedback forms with various question types and activate them for students.
              </p>
            </Card>

            <Card style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '0 auto 1rem auto'
              }}>
                2
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>
                Students Submit Feedback
              </h3>
              <p style={{ color: '#666' }}>
                Students access available forms, provide ratings and comments, and submit their feedback securely.
              </p>
            </Card>

            <Card style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffc107, #fd7e14)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '0 auto 1rem auto'
              }}>
                3
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>
                View Analytics
              </h3>
              <p style={{ color: '#666' }}>
                Both admins and students can view aggregated results, charts, and detailed feedback insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#333',
        color: 'white',
        padding: '2rem 1rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ margin: 0, opacity: 0.8 }}>
            © 2024 Student Feedback & Evaluation System. Built with React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
