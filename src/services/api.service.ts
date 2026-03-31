import { IWeatherResponse } from '@models/weather.interface';

export class WeatherService {
  private static instance: WeatherService;

  private constructor() {}

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  public async getWeatherByCity(city: string): Promise<IWeatherResponse> {
    // process.env теперь типизирован глобально
    const url = `${process.env.API_BASE_URL}/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
    return this.fetchWeather(url);
  }

  private async fetchWeather(url: string): Promise<IWeatherResponse> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default WeatherService.getInstance();