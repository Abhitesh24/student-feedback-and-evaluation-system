import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../data/constants';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';

const CreateFeedbackForm = () => {
  const navigate = useNavigate();
  const [feedbackForms, setFeedbackForms] = useLocalStorage(STORAGE_KEYS.FEEDBACK_FORMS, []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      courseName: '',
      instructorName: '',
      questions: [{ question: '', type: 'rating' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const addQuestion = () => {
    append({ question: '', type: 'rating' });
  };

  const removeQuestion = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const newForm = {
      id: Date.now(),
      courseName: data.courseName,
      instructorName: data.instructorName,
      questions: data.questions.map((q, index) => ({
        id: index + 1,
        question: q.question,
        type: q.type
      })),
      createdAt: new Date().toISOString(),
      isActive: true
    };

    const updatedForms = [...feedbackForms, newForm];
    setFeedbackForms(updatedForms);

    toast.success('Feedback form created successfully!');
    setIsSubmitting(false);

    // Reset form
    reset();

    // Navigate to manage forms page
    setTimeout(() => {
      navigate('/admin/manage-feedback');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem', color: '#333' }}>Create Feedback Form</h1>
          <p style={{ color: '#666', margin: 0 }}>
            Design a new feedback form with custom questions and response types.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Form Details</h3>

            <div className="form-group">
              <label htmlFor="courseName" className="form-label">
                Course Name *
              </label>
              <input
                id="courseName"
                type="text"
                className="form-input"
                placeholder="Enter course name"
                {...register('courseName', {
                  required: 'Course name is required',
                  minLength: {
                    value: 3,
                    message: 'Course name must be at least 3 characters'
                  }
                })}
              />
              {errors.courseName && (
                <div className="form-error">{errors.courseName.message}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="instructorName" className="form-label">
                Instructor Name *
              </label>
              <input
                id="instructorName"
                type="text"
                className="form-input"
                placeholder="Enter instructor name"
                {...register('instructorName', {
                  required: 'Instructor name is required',
                  minLength: {
                    value: 2,
                    message: 'Instructor name must be at least 2 characters'
                  }
                })}
              />
              {errors.instructorName && (
                <div className="form-error">{errors.instructorName.message}</div>
              )}
            </div>
          </Card>

          <Card style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: 0, color: '#333' }}>Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="btn btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem'
                }}
              >
                <FaPlus size={12} /> Add Question
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {fields.map((field, index) => (
                <div key={field.id} className="question-editor">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ margin: 0, color: '#333' }}>
                      Question {index + 1}
                    </h4>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="btn btn-danger"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem'
                        }}
                      >
                        <FaTrash size={10} />
                      </button>
                    )}
                  </div>

                  <textarea
                    className="question-input"
                    placeholder="Enter your question here..."
                    rows={3}
                    {...register(`questions.${index}.question`, {
                      required: 'Question text is required',
                      minLength: {
                        value: 5,
                        message: 'Question must be at least 5 characters'
                      }
                    })}
                  />
                  {errors.questions?.[index]?.question && (
                    <div className="form-error" style={{ marginTop: '0.5rem' }}>
                      {errors.questions[index].question.message}
                    </div>
                  )}

                  <div className="question-type">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        value="rating"
                        {...register(`questions.${index}.type`)}
                        defaultChecked
                      />
                      Rating (1-5 stars)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        value="text"
                        {...register(`questions.${index}.type`)}
                      />
                      Text Response
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            paddingTop: '1rem',
            borderTop: '1px solid #dee2e6'
          }}>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="btn btn-secondary"
            >
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
                  Creating...
                </>
              ) : (
                <>
                  <FaSave /> Create Form
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeedbackForm;
