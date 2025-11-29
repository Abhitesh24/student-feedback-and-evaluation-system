import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, INITIAL_FEEDBACK_FORMS, INITIAL_FEEDBACK_SUBMISSIONS } from '../data/constants';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaChartBar, FaUsers, FaStar, FaClipboardList } from 'react-icons/fa';

const ViewResults = () => {
  const [feedbackForms] = useLocalStorage(STORAGE_KEYS.FEEDBACK_FORMS, INITIAL_FEEDBACK_FORMS);
  const [feedbackSubmissions] = useLocalStorage(STORAGE_KEYS.FEEDBACK_SUBMISSIONS, INITIAL_FEEDBACK_SUBMISSIONS);

  // Calculate overall statistics
  const totalForms = feedbackForms.length;
  const totalSubmissions = feedbackSubmissions.length;
  const uniqueStudents = new Set(feedbackSubmissions.map(sub => sub.studentId)).size;

  // Calculate average ratings per form
  const formResults = feedbackForms
    .filter(form => form && form.questions && Array.isArray(form.questions))
    .map(form => {
      const formSubmissions = feedbackSubmissions.filter(sub => sub && sub.formId === form.id && sub.responses && Array.isArray(sub.responses));
      const ratingQuestions = form.questions.filter(q => q && q.type === 'rating');

      const averages = ratingQuestions.map(question => {
        const responses = formSubmissions
          .map(sub => sub.responses.find(r => r && r.questionId === question.id))
          .filter(r => r && r.response)
          .map(r => parseInt(r.response));

        const average = responses.length > 0 ? (responses.reduce((a, b) => a + b, 0) / responses.length).toFixed(1) : 0;

        return {
          question: question.question && question.question.length > 50 ? question.question.substring(0, 50) + '...' : (question.question || ''),
          average: parseFloat(average),
          count: responses.length
        };
      });

      return {
        formId: form.id,
        courseName: form.courseName || '',
        instructorName: form.instructorName || '',
        submissionCount: formSubmissions.length,
        averages
      };
    });

  // Prepare chart data
  const submissionData = formResults.map(result => ({
    name: result.courseName.length > 20 ? result.courseName.substring(0, 20) + '...' : result.courseName,
    submissions: result.submissionCount
  }));

  const overallRatingData = formResults.flatMap(result =>
    result.averages.map(avg => ({
      course: result.courseName,
      question: avg.question,
      average: avg.average
    }))
  );

  // Colors for charts
  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  if (totalSubmissions === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Navbar />
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <Card style={{ textAlign: 'center', padding: '3rem' }}>
            <FaClipboardList size={48} color="#6c757d" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Results Available</h3>
            <p style={{ color: '#888', marginBottom: '2rem' }}>
              No feedback submissions have been received yet. Results will appear here once students start submitting feedback.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem', color: '#333' }}>Feedback Results & Analytics</h1>
          <p style={{ color: '#666', margin: 0 }}>
            Comprehensive overview of all feedback submissions and ratings.
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
          <Card style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'white'
          }}>
            <FaClipboardList size={32} color="#667eea" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0', color: '#333' }}>
              {totalForms}
            </h3>
            <h4 style={{ margin: '0.5rem 0', color: '#666' }}>Total Forms</h4>
          </Card>

          <Card style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'white'
          }}>
            <FaUsers size={32} color="#28a745" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0', color: '#333' }}>
              {totalSubmissions}
            </h3>
            <h4 style={{ margin: '0.5rem 0', color: '#666' }}>Total Submissions</h4>
          </Card>
        </div>

        {/* Submission Distribution Chart */}
        <Card style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>
            <FaChartBar style={{ marginRight: '0.5rem' }} />
            Submissions by Course
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submissions" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Detailed Results per Form */}
        <div className="grid grid-1">
          {formResults.map((result) => (
            <Card key={result.formId} style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>
                    {result.courseName}
                  </h3>
                  <p style={{ margin: 0, color: '#666' }}>
                    Instructor: {result.instructorName}
                  </p>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '0.75rem',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                    {result.submissionCount}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Submissions
                  </div>
                </div>
              </div>

              {result.averages.length > 0 && (
                <div>
                  <h4 style={{ marginBottom: '1rem', color: '#333' }}>
                    <FaStar style={{ marginRight: '0.5rem' }} />
                    Average Ratings
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {result.averages.map((avg, index) => (
                      <div key={index} style={{
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '6px'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          <span style={{ fontWeight: '500', color: '#333' }}>
                            {avg.question}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                              fontSize: '1.25rem',
                              fontWeight: 'bold',
                              color: '#333'
                            }}>
                              {avg.average}
                            </span>
                            <div style={{ display: 'flex', gap: '2px' }}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  size={16}
                                  color={star <= Math.round(avg.average) ? '#ffc107' : '#e9ecef'}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>
                          Based on {avg.count} responses
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              {(() => {
                const formSubmissions = feedbackSubmissions.filter(sub => sub.formId === result.formId);
                const form = feedbackForms.find(f => f.id === result.formId);
                if (!form || !form.questions) return null;

                const textQuestions = form.questions.filter(q => q.type === 'text');
                const comments = formSubmissions.flatMap(sub =>
                  sub.responses
                    .filter(r => textQuestions.some(q => q.id === r.questionId))
                    .map(r => r.response)
                    .filter(comment => comment && comment.trim())
                );

                if (comments.length === 0) return null;

                return (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#333' }}>
                      Student Comments ({comments.length})
                    </h4>
                    <div style={{
                      maxHeight: '300px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      {comments.map((comment, index) => (
                        <div key={index} style={{
                          padding: '1rem',
                          background: '#f8f9fa',
                          borderRadius: '6px',
                          borderLeft: '4px solid #667eea'
                        }}>
                          <p style={{ margin: 0, color: '#333', fontStyle: 'italic' }}>
                            "{comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewResults;
