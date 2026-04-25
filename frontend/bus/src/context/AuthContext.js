import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load user from storage if token exists
    if (token) {
      loadUser();
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await authAPI.getUserById(userId);
        setUser(response.data.data);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      logout();
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(formData);
      const { data } = response.data;
      setUser(data);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      const { data } = response.data;
      
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      
      // Fetch full user data
      const userResponse = await authAPI.getUserById(data.userId);
      setUser(userResponse.data.data);
      
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
