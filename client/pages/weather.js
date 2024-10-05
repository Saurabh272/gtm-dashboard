import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import WeatherDisplay from '../components/WeatherDisplay';
import { getWeather } from '../utils/api';

export default function Weather() {
  const { user, loading } = useAuth();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      window.dataLayer.push({
        event: 'weatherSearch',
        searchTerm: city,
      });
      const data = await getWeather(city);
      setWeatherData(data);
      window.dataLayer.push({
        event: 'weatherSearchSuccess',
        city: city,
      });
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
      window.dataLayer.push({
        event: 'weatherSearchError',
        errorMessage: error.message,
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <p className="text-center text-xl">Please login to view this page.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="input flex-grow mr-2"
          />
          <button type="submit" className="btn btn-primary">Get Weather</button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}