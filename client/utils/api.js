import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};

export const getWeather = async (city) => {
  const response = await axios.get(`${API_URL}/weather?city=${city}`);
  return response.data;
};