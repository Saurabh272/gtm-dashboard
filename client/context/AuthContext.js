import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../utils/api';
import { getStoredUser, storeUser, removeUser } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      setUser(data);
      storeUser(data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const data = await apiRegister(email, password);
      setUser(data);
      storeUser(data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);