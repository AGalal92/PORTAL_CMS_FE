import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Set Axios defaults
  axios.defaults.withCredentials = true; // Include cookies in all requests
  axios.defaults.baseURL = backendURL; // Set the base URL for all requests

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });



  // Fetch CSRF token and set default headers for axios
  const fetchCsrfToken = async () => {
    try {
      await axios.get(`${backendURL}/sanctum/csrf-cookie`, { withCredentials: true });
      // Retrieve CSRF token from cookies and set it as a default header
      const xsrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
      if (xsrfToken) {
        console.log('CSRF Token:', decodeURIComponent(xsrfToken));
        axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
      }
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  };
  const register = async (name, email, password, passwordConfirmation) => {
    try {
      await fetchCsrfToken(); // Fetch CSRF token first
      const response = await axios.post(
        `${backendURL}/register`,
        { name, email, password, password_confirmation: passwordConfirmation },
        { withCredentials: true }
      );
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      if (error.response && error.response.data) {
        // Return the error message or errors object
        return error.response.data.errors || error.response.data.message || 'Registration failed';
      }
      return 'An unexpected error occurred.';
    }
  };

  const login = async (email, password) => {
    try {
      await fetchCsrfToken(); // Fetch CSRF token first
      const response = await axios.post(
        `${backendURL}/login`,
        { email, password },
        { withCredentials: true } // Include cookies in the request
      );
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetchCsrfToken(); // Fetch CSRF token before logout

      await axios.post(`${backendURL}/logout`, {}, { withCredentials: true });

      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };


  useEffect(() => {
    // Auto-login user if token and user data are valid (optional)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
