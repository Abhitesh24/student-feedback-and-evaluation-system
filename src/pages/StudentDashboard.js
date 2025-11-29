import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../data/constants';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { FaClipboardList, FaCheckCircle, FaChartBar, FaUserGraduate } from 'react-icons/fa';

const StudentDashboard = () => {
  const [feedbackForms] = useLocalStorage(STORAGE_KEYS.FEEDBACK_FORMS, []);
  const [feedbackSubmissions] = useLocalStorage(STORAGE_KEYS.FEEDBACK_SUBMISSIONS, []);

  // For demo purposes, assume student ID is 1
  const studentId = 1;
  const submittedFormIds = feedbackSubmissions
    .filter(sub => sub.studentId === studentId)
    .map(sub => sub.formId);

  const availableForms = feedbackForms.filter(form =>
    form.isActive && !submittedFormIds.includes(form.id)
  );

  const completedForms = feedbackForms.filter(form =>
    submittedFormIds.includes(form.id)
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem', color: '#333' }}>Student Dashboard</h1>
          <p style={{ color: '#666', margin: 0 }}>
            Welcome! Manage your feedback submissions and view results.
          </p>
        </div>

        <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
          <Card style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'white',
            borderLeft: '4px solid #28a745'
          }}>
            <FaClipboardList size={32} color="#28a745" style={{ marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '2rem',
              margin: '0.5rem 0',
              color: '#333'
            }}>
              {availableForms.length}
            </h3>
            <h4 style={{ margin: '0.5rem 0', color: '#666' }}>
              Available Forms
            </h4>
            <p style={{ color: '#888', margin: 0 }}>
              Forms waiting for your feedback
            </p>
          </Card>

          <Card style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'white',
            borderLeft: '4px solid #667eea'
          }}>
            <FaCheckCircle size={32} color="#667eea" style={{ marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '2rem',
              margin: '0.5rem 0',
              color: '#333'
            }}>
              {completedForms.length}
            </h3>
            <h4 style={{ margin: '0.5rem 0', color: '#666' }}>
              Completed Forms
            </h4>
            <p style={{ color: '#888', margin: 0 }}>
              Forms you've already submitted
            </p>
          </Card>
        </div>

        <div className="grid grid-2">
          <Card>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Available Feedback Forms</h3>
            {availableForms.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No feedback forms available at the moment. Check back later!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {availableForms.map((form) => (
                  <div
                    key={form.id}
                    style={{
                      padding: '1rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      background: '#f8f9fa'
                    }}
                  >
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                      {form.courseName}
                    </h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                      Instructor: {form.instructorName}
                    </p>
                    <a
                      href="/student/submit-feedback"
                      className="btn btn-primary"
                      style={{
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        padding: '0.5rem 1rem'
                      }}
                    >
                      Submit Feedback
                    </a>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="/student/submit-feedback"
                className="btn btn-primary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                <FaClipboardList style={{ marginRight: '0.5rem' }} />
                Submit Feedback
              </a>
              <a
                href="/results"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                <FaChartBar style={{ marginRight: '0.5rem' }} />
                View Results
              </a>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#333' }}>Your Progress</h4>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e9ecef',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${feedbackForms.length > 0 ? (completedForms.length / feedbackForms.length) * 100 : 0}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #28a745, #20c997)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.875rem',
                color: '#666'
              }}>
                {completedForms.length} of {feedbackForms.length} forms completed
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
