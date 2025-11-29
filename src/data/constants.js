// Predefined credentials for authentication
export const CREDENTIALS = {
  admin: {
    username: 'admin',
    password: 'admin123'
  },
  student: {
    email: 'student@test.com',
    password: '123456'
  }
};

// Initial data structure for feedback forms
export const INITIAL_FEEDBACK_FORMS = [
  {
    id: 1,
    courseName: 'Introduction to Computer Science',
    instructorName: 'Dr. John Smith',
    questions: [
      {
        id: 1,
        question: 'How would you rate the instructor\'s teaching effectiveness?',
        type: 'rating'
      },
      {
        id: 2,
        question: 'How clear were the course materials?',
        type: 'rating'
      },
      {
        id: 3,
        question: 'How engaging was the course content?',
        type: 'rating'
      },
      {
        id: 4,
        question: 'Any additional comments?',
        type: 'text'
      }
    ],
    createdAt: new Date().toISOString(),
    isActive: true
  }
];

// Initial data structure for feedback submissions
export const INITIAL_FEEDBACK_SUBMISSIONS = [];

// localStorage keys
export const STORAGE_KEYS = {
  FEEDBACK_FORMS: 'feedbackForms',
  FEEDBACK_SUBMISSIONS: 'feedbackSubmissions',
  USER_ROLE: 'userRole'
};
