import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, CREDENTIALS } from '../data/constants';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [userRole, setUserRole] = useLocalStorage(STORAGE_KEYS.USER_ROLE, null);

  const login = (credentials, role) => {
    const validCredentials = CREDENTIALS[role];

    if (!validCredentials) {
      toast.error('Invalid role specified');
      return false;
    }

    // Check credentials based on role
    if (role === 'admin') {
      if (credentials.username === validCredentials.username &&
          credentials.password === validCredentials.password) {
        setUserRole('admin');
        toast.success('Admin login successful!');
        return true;
      }
    } else if (role === 'student') {
      if (credentials.email === validCredentials.email &&
          credentials.password === validCredentials.password) {
        setUserRole('student');
        toast.success('Student login successful!');
        return true;
      }
    }

    toast.error('Invalid credentials. Please try again.');
    return false;
  };

  const logout = () => {
    setUserRole(null);
    toast.info('Logged out successfully');
  };

  const isAuthenticated = () => {
    return userRole !== null;
  };

  const hasRole = (role) => {
    return userRole === role;
  };

  return {
    userRole,
    login,
    logout,
    isAuthenticated,
    hasRole
  };
};
