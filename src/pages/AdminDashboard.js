import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../data/constants';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { FaClipboardList, FaCheckCircle, FaUsers, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const [feedbackForms] = useLocalStorage(STORAGE_KEYS.FEEDBACK_FORMS, []);
  const [feedbackSubmissions] = useLocalStorage(STORAGE_KEYS.FEEDBACK_SUBMISSIONS, []);

  // Calculate statistics
  const totalForms = feedbackForms.length;
  const activeForms = feedbackForms.filter(form => form.isActive).length;
  const totalSubmissions = feedbackSubmissions.length;
  const uniqueSubmitters = new Set(feedbackSubmissions.map(sub => sub.studentId)).size;

  const stats = [
    {
      title: 'Total Forms',
      value: totalForms,
      icon: <FaClipboardList size={24} color="#667eea" />,
      description: 'Feedback forms created'
    },
    {
      title: 'Active Forms',
      value: activeForms,
      icon: <FaCheckCircle size={24} color="#28a745" />,
      description: 'Currently active forms'
    },
    {
      title: 'Total Submissions',
      value: totalSubmissions,
      icon: <FaUsers size={24} color="#ffc107" />,
      description: 'Feedback submissions received'
    },
    {
      title: 'Unique Students',
      value: uniqueSubmitters,
      icon: <FaChartBar size={24} color="#dc3545" />,
      description: 'Students who submitted feedback'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem', color: '#333' }}>Admin Dashboard</h1>
          <p style={{ color: '#666', margin: 0 }}>
            Welcome back! Here's an overview of your feedback system.
          </p>
        </div>

        <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
          {stats.map((stat, index) => (
            <Card key={index} style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                {stat.icon}
              </div>
              <h3 style={{
                fontSize: '2.5rem',
                margin: '0.5rem 0',
                color: '#333',
                fontWeight: 'bold'
              }}>
                {stat.value}
              </h3>
              <h4 style={{
                margin: '0.5rem 0',
                color: '#666',
                fontSize: '1.1rem'
              }}>
                {stat.title}
              </h4>
              <p style={{
                color: '#888',
                margin: 0,
                fontSize: '0.9rem'
              }}>
                {stat.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-2">
          <Card>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="/admin/create-feedback"
                className="btn btn-primary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                Create New Feedback Form
              </a>
              <a
                href="/admin/manage-feedback"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                Manage Existing Forms
              </a>
              <a
                href="/results"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                View Results & Analytics
              </a>
            </div>
          </Card>

          <Card>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Recent Activity</h3>
            {feedbackForms.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No feedback forms created yet. Create your first form to get started!
              </p>
            ) : (
              <div>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Latest feedback forms:
                </p>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {feedbackForms.slice(-3).reverse().map((form) => (
                    <div
                      key={form.id}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #eee',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        background: '#f8f9fa'
                      }}
                    >
                      <strong>{form.courseName}</strong><br />
                      <small style={{ color: '#666' }}>
                        by {form.instructorName} • {new Date(form.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
