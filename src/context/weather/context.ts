import { createContext, useContext } from 'react';
import { IWeatherResponse } from '@models/weather.interface';

interface IWeatherStatusState {
  isLoading: boolean;
  error: string | null;
}

export const WeatherStatusContext = createContext<IWeatherStatusState>({
  isLoading: false,
  error: null
});

export const WeatherDataContext = createContext<IWeatherResponse | null>(null);

interface IWeatherActions {
  fetchWeather: (city: string) => Promise<void>;
}

export const WeatherActionsContext = createContext<IWeatherActions>({
  fetchWeather: async () => {}
});

export const useWeatherStatus = () => useContext(WeatherStatusContext);
export const useWeatherData = () => useContext(WeatherDataContext);
export const useWeatherActions = () => useContext(WeatherActionsContext);