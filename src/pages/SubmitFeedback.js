import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../data/constants';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { toast } from 'react-toastify';
import { FaStar, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

const SubmitFeedback = () => {
  const navigate = useNavigate();
  const [feedbackForms] = useLocalStorage(STORAGE_KEYS.FEEDBACK_FORMS, []);
  const [feedbackSubmissions, setFeedbackSubmissions] = useLocalStorage(STORAGE_KEYS.FEEDBACK_SUBMISSIONS, []);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingHoverValues, setRatingHoverValues] = useState({});

  // For demo purposes, assume student ID is 1
  const studentId = 1;

  // Get available forms (active and not submitted by this student)
  const availableForms = feedbackForms.filter(form => {
    const isActive = form.isActive;
    const notSubmitted = !feedbackSubmissions.some(sub =>
      sub.formId === form.id && sub.studentId === studentId
    );
    return isActive && notSubmitted;
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
    trigger,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {}
  });

  useEffect(() => {
    if (availableForms.length > 0 && !selectedForm) {
      setSelectedForm(availableForms[0]);
    }
  }, [availableForms, selectedForm]);

  // Trigger validation when form changes
  useEffect(() => {
    if (selectedForm && selectedForm.questions) {
      // Trigger validation for all questions after a short delay
      setTimeout(() => {
        selectedForm.questions.forEach(question => {
          trigger(`question_${question.id}`);
        });
      }, 100);
    }
  }, [selectedForm, trigger]);

  const handleFormChange = (formId) => {
    const form = feedbackForms.find(f => f.id === parseInt(formId));
    setSelectedForm(form);
    reset(); // Reset form when changing forms
    setRatingHoverValues({}); // Reset hover values when changing forms
  };

  const renderRatingInput = (questionId, questionText) => {
    const currentValue = watch(`question_${questionId}`) || 0;
    const hoverValue = ratingHoverValues[questionId] || 0;

    const displayValue = hoverValue || currentValue;

    return (
      <div className="question-item">
        <h4>{questionText}</h4>
        <div className="rating-scale">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                style={{
                  cursor: 'pointer',
                  color: star <= displayValue ? '#ffc107' : '#e9ecef',
                  transition: 'color 0.2s ease'
                }}
                onClick={() => {
                  setValue(`question_${questionId}`, star);
                  trigger(`question_${questionId}`);
                }}
                onMouseEnter={() => setRatingHoverValues(prev => ({ ...prev, [questionId]: star }))}
                onMouseLeave={() => setRatingHoverValues(prev => ({ ...prev, [questionId]: 0 }))}
              />
            ))}
          </div>
          <div className="rating-labels">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>
        <input
          type="hidden"
          {...register(`question_${questionId}`, {
            required: 'Please provide a rating',
            min: { value: 1, message: 'Rating must be at least 1' },
            max: { value: 5, message: 'Rating cannot exceed 5' }
          })}
        />
        {errors[`question_${questionId}`] && (
          <div className="form-error" style={{ marginTop: '0.5rem' }}>
            {errors[`question_${questionId}`].message}
          </div>
        )}
      </div>
    );
  };

  const renderTextInput = (questionId, questionText) => {
    return (
      <div className="question-item">
        <h4>{questionText}</h4>
        <textarea
          className="form-input"
          rows={4}
          placeholder="Enter your feedback here..."
          {...register(`question_${questionId}`, {
            required: 'Please provide your feedback',
            minLength: {
              value: 10,
              message: 'Please provide at least 10 characters'
            }
          })}
        />
        {errors[`question_${questionId}`] && (
          <div className="form-error">{errors[`question_${questionId}`].message}</div>
        )}
      </div>
    );
  };

  const onSubmit = async (data) => {
    if (!selectedForm) {
      toast.error('Please select a feedback form first.');
      return;
    }

    // Validate that all questions have been answered
    const missingAnswers = selectedForm.questions.filter(question => {
      const answer = data[`question_${question.id}`];
      return !answer || (typeof answer === 'string' && answer.trim() === '');
    });

    if (missingAnswers.length > 0) {
      toast.error(`Please answer all questions before submitting. ${missingAnswers.length} question(s) are still unanswered.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const responses = selectedForm.questions.map(question => ({
        questionId: question.id,
        question: question.question,
        response: data[`question_${question.id}`]
      }));

      const submission = {
        id: Date.now(),
        formId: selectedForm.id,
        studentId: studentId,
        responses: responses,
        submittedAt: new Date().toISOString()
      };

      const updatedSubmissions = [...feedbackSubmissions, submission];
      setFeedbackSubmissions(updatedSubmissions);

      toast.success('Feedback submitted successfully!');
      setIsSubmitting(false);

      // Navigate back to dashboard after a delay
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (availableForms.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Navbar />
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <Card style={{ textAlign: 'center', padding: '3rem' }}>
            <FaPaperPlane size={48} color="#6c757d" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Forms Available</h3>
            <p style={{ color: '#888', marginBottom: '2rem' }}>
              There are no feedback forms available for you to submit at this time.
              Check back later or contact your instructor.
            </p>
            <button
              onClick={() => navigate('/student/dashboard')}
              className="btn btn-primary"
            >
              <FaArrowLeft style={{ marginRight: '0.5rem' }} />
              Back to Dashboard
            </button>
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
          <h1 style={{ marginBottom: '0.5rem', color: '#333' }}>Submit Feedback</h1>
          <p style={{ color: '#666', margin: 0 }}>
            Provide honest feedback to help improve the course quality.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} key={selectedForm?.id || 'no-form'}>
          <Card style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Select Form</h3>
            <div className="form-group">
              <label htmlFor="formSelect" className="form-label">
                Choose a feedback form to submit
              </label>
              <select
                id="formSelect"
                className="form-input"
                value={selectedForm?.id || ''}
                onChange={(e) => handleFormChange(e.target.value)}
              >
                {availableForms.map((form) => (
                  <option key={form.id} value={form.id}>
                    {form.courseName} - {form.instructorName}
                  </option>
                ))}
              </select>
            </div>

            {selectedForm && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                  {selectedForm.courseName}
                </h4>
                <p style={{ margin: 0, color: '#666' }}>
                  Instructor: {selectedForm.instructorName}
                </p>
              </div>
            )}
          </Card>

          {selectedForm && (
            <Card style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>
                Feedback Questions ({selectedForm.questions.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {selectedForm.questions.map((question) => (
                  <div key={question.id}>
                    {question.type === 'rating'
                      ? renderRatingInput(question.id, question.question)
                      : renderTextInput(question.id, question.question)
                    }
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            paddingTop: '1rem',
            borderTop: '1px solid #dee2e6'
          }}>
            <button
              type="button"
              onClick={() => navigate('/student/dashboard')}
              className="btn btn-secondary"
            >
              <FaArrowLeft style={{ marginRight: '0.5rem' }} />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || isSubmitting}
              style={{
                opacity: isValid && !isSubmitting ? 1 : 0.6,
                cursor: isValid && !isSubmitting ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner" style={{ width: '16px', height: '16px' }} />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Submit Feedback
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitFeedback;
