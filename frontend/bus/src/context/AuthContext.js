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
      if (userId && userId !== 'undefined') {
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
      const { data } = response.data; // This is LoginResponse
      
      const token = data.token;
      const userObj = data.user;
      
      setToken(token);
      localStorage.setItem('token', token);
      
      if (userObj && userObj.id) {
        localStorage.setItem('userId', userObj.id);
        setUser(userObj);
      }
      
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
