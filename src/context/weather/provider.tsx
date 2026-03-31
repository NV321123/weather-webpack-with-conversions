import React, { useEffect, useReducer, useCallback, ReactNode, useMemo } from 'react';
import { WeatherStatusContext, WeatherDataContext, WeatherActionsContext } from './context';
import { weatherReducer, initialWeatherState } from './reducer';
import weatherService from '@services/api.service';

interface IProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = 'weather_app_last_city';

export const WeatherProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;

    dispatch({ type: 'FETCH_START', payload: city });
    
    try {
      const data = await weatherService.getWeatherByCity(city);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      localStorage.setItem(LOCAL_STORAGE_KEY, city);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
    }
  }, []);

  useEffect(() => {
    const lastCity = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, [fetchWeather]);

  const statusValue = useMemo(() => ({
    isLoading: state.isLoading,
    error: state.error
  }), [state.isLoading, state.error]);

  const dataValue = state.data;

  const actionsValue = useMemo(() => ({
    fetchWeather
  }), [fetchWeather]);

  console.log('provider');

  return (
    <WeatherActionsContext.Provider value={actionsValue}>
      <WeatherStatusContext.Provider value={statusValue}>
        <WeatherDataContext.Provider value={dataValue}>
          {children}
        </WeatherDataContext.Provider>
      </WeatherStatusContext.Provider>
    </WeatherActionsContext.Provider>
  );
};