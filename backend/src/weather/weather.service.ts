import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly weatherBaseUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly geocodingBaseUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  async getWeather(city: string) {
    try {
      // Step 1: Geocode the city name
      const geocodingResponse = await axios.get(this.geocodingBaseUrl, {
        params: { name: city, count: 1 },
      });

      if (
        !geocodingResponse.data.results ||
        geocodingResponse.data.results.length === 0
      ) {
        throw new HttpException('City not found', HttpStatus.NOT_FOUND);
      }

      const { latitude, longitude } = geocodingResponse.data.results[0];

      // Step 2: Fetch weather data
      const weatherResponse = await axios.get(this.weatherBaseUrl, {
        params: {
          latitude,
          longitude,
          current_weather: true,
          timezone: 'auto',
        },
      });

      return {
        city,
        ...weatherResponse.data.current_weather,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch weather data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}