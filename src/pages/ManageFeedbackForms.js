import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../data/constants';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff, FaPlus } from 'react-icons/fa';

const ManageFeedbackForms = () => {
  const [feedbackForms, setFeedbackForms] = useLocalStorage(STORAGE_KEYS.FEEDBACK_FORMS, []);
  const [feedbackSubmissions] = useLocalStorage(STORAGE_KEYS.FEEDBACK_SUBMISSIONS, []);
  const [editingForm, setEditingForm] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const getSubmissionCount = (formId) => {
    return feedbackSubmissions.filter(sub => sub.formId === formId).length;
  };

  const toggleFormStatus = (formId) => {
    const updatedForms = feedbackForms.map(form =>
      form.id === formId ? { ...form, isActive: !form.isActive } : form
    );
    setFeedbackForms(updatedForms);
    toast.success('Form status updated successfully!');
  };

  const deleteForm = (formId) => {
    const updatedForms = feedbackForms.filter(form => form.id !== formId);
    setFeedbackForms(updatedForms);
    setShowDeleteConfirm(null);
    toast.success('Form deleted successfully!');
  };

  const startEditing = (form) => {
    setEditingForm({ ...form });
  };

  const saveEdit = () => {
    const updatedForms = feedbackForms.map(form =>
      form.id === editingForm.id ? editingForm : form
    );
    setFeedbackForms(updatedForms);
    setEditingForm(null);
    toast.success('Form updated successfully!');
  };

  const cancelEdit = () => {
    setEditingForm(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem', color: '#333' }}>Manage Feedback Forms</h1>
            <p style={{ color: '#666', margin: 0 }}>
              View, edit, and manage all feedback forms.
            </p>
          </div>
          <a
            href="/admin/create-feedback"
            className="btn btn-primary"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaPlus /> Create New Form
          </a>
        </div>

        {feedbackForms.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Feedback Forms Created</h3>
            <p style={{ color: '#888', marginBottom: '2rem' }}>
              Get started by creating your first feedback form.
            </p>
            <a
              href="/admin/create-feedback"
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Create First Form
            </a>
          </Card>
        ) : (
          <div className="grid grid-1">
            {feedbackForms.map((form) => (
              <Card key={form.id} style={{ marginBottom: '1.5rem' }}>
                {editingForm && editingForm.id === form.id ? (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Course Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={editingForm.courseName}
                        onChange={(e) => setEditingForm({
                          ...editingForm,
                          courseName: e.target.value
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Instructor Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={editingForm.instructorName}
                        onChange={(e) => setEditingForm({
                          ...editingForm,
                          instructorName: e.target.value
                        })}
                      />
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'flex-end',
                      marginTop: '1rem'
                    }}>
                      <button
                        onClick={cancelEdit}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                          {form.courseName}
                        </h3>
                        <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>
                          Instructor: {form.instructorName}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            background: form.isActive ? '#d4edda' : '#f8d7da',
                            color: form.isActive ? '#155724' : '#721c24'
                          }}>
                            {form.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span style={{
                            fontSize: '0.875rem',
                            color: '#666'
                          }}>
                            {getSubmissionCount(form.id)} submissions
                          </span>
                          <span style={{
                            fontSize: '0.875rem',
                            color: '#666'
                          }}>
                            Created: {new Date(form.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        <button
                          onClick={() => toggleFormStatus(form.id)}
                          className={`btn ${form.isActive ? 'btn-secondary' : 'btn-primary'}`}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          {form.isActive ? <FaToggleOff /> : <FaToggleOn />}
                          {form.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => startEditing(form)}
                          className="btn btn-secondary"
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <FaEdit size={12} /> Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(form.id)}
                          className="btn btn-danger"
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <FaTrash size={12} /> Delete
                        </button>
                      </div>
                    </div>

                    <div style={{
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '6px'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                        Questions ({form.questions.length})
                      </h4>
                      <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {form.questions.map((question, index) => (
                          <div
                            key={question.id}
                            style={{
                              padding: '0.5rem 0',
                              borderBottom: index < form.questions.length - 1 ? '1px solid #dee2e6' : 'none',
                              fontSize: '0.9rem'
                            }}
                          >
                            <strong>{index + 1}.</strong> {question.question}
                            <span style={{
                              marginLeft: '0.5rem',
                              fontSize: '0.8rem',
                              color: '#666',
                              background: '#e9ecef',
                              padding: '0.125rem 0.375rem',
                              borderRadius: '3px'
                            }}>
                              {question.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <Card style={{ maxWidth: '400px', width: '100%', margin: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Confirm Delete</h3>
              <p style={{ marginBottom: '2rem', color: '#666' }}>
                Are you sure you want to delete this feedback form? This action cannot be undone and will also delete all associated submissions.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteForm(showDeleteConfirm)}
                  className="btn btn-danger"
                >
                  Delete Form
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFeedbackForms;
