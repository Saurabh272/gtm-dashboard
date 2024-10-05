export default function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;

  const {
    city,
    temperature,
    weathercode,
    windspeed,
    winddirection
  } = weatherData;

  const getWeatherDescription = (code) => {
    // This is a simplified version. You might want to expand this based on the Open-Meteo weathercode values.
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      95: 'Thunderstorm',
    };
    return descriptions[code] || 'Unknown';
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">{city}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Temperature</p>
          <p className="text-3xl font-bold">{temperature}°C</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Weather</p>
          <p className="text-xl">{getWeatherDescription(weathercode)}</p>
        </div>
        <div>
          <p className="text-gray-600">Wind Speed</p>
          <p className="text-xl">{windspeed} km/h</p>
        </div>
        <div>
          <p className="text-gray-600">Wind Direction</p>
          <p className="text-xl">{winddirection}°</p>
        </div>
      </div>
    </div>
  );
}