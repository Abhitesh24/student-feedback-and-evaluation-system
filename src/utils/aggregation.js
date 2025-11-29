// Utility functions for aggregating feedback data

export const calculateAverageRating = (submissions, questionId) => {
  const responses = submissions
    .map(sub => sub.responses.find(r => r.questionId === questionId))
    .filter(r => r && r.response && !isNaN(parseInt(r.response)))
    .map(r => parseInt(r.response));

  if (responses.length === 0) return 0;

  const sum = responses.reduce((acc, rating) => acc + rating, 0);
  return (sum / responses.length).toFixed(1);
};

export const getSubmissionCount = (submissions, formId) => {
  return submissions.filter(sub => sub.formId === formId).length;
};

export const getUniqueSubmitters = (submissions) => {
  return new Set(submissions.map(sub => sub.studentId)).size;
};

export const getFormStatistics = (forms, submissions) => {
  return forms.map(form => {
    const formSubmissions = submissions.filter(sub => sub.formId === form.id);
    const ratingQuestions = form.questions.filter(q => q.type === 'rating');

    const averages = ratingQuestions.map(question => ({
      questionId: question.id,
      question: question.question,
      average: parseFloat(calculateAverageRating(formSubmissions, question.id)),
      count: formSubmissions.filter(sub =>
        sub.responses.some(r => r.questionId === question.id && r.response)
      ).length
    }));

    return {
      formId: form.id,
      courseName: form.courseName,
      instructorName: form.instructorName,
      submissionCount: formSubmissions.length,
      averages,
      isActive: form.isActive
    };
  });
};

export const getOverallStatistics = (forms, submissions) => {
  const totalForms = forms.length;
  const activeForms = forms.filter(form => form.isActive).length;
  const totalSubmissions = submissions.length;
  const uniqueStudents = getUniqueSubmitters(submissions);

  return {
    totalForms,
    activeForms,
    totalSubmissions,
    uniqueStudents
  };
};
