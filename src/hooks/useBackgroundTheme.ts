import { useMemo } from 'react';
import { IWeatherResponse } from '@models/weather.interface';

const themeMap: Record<string, string> = {
  Clear: 'theme-clear',
  
  Clouds: 'theme-clouds',
  
  Rain: 'theme-rain',
  Drizzle: 'theme-rain',
  
  Snow: 'theme-snow',
  
  Thunderstorm: 'theme-storm',
  Squall: 'theme-storm', 
  Tornado: 'theme-storm',
  
  Mist: 'theme-mist',
  Fog: 'theme-mist',
  Haze: 'theme-mist',
  Smoke: 'theme-mist', 
  Dust: 'theme-mist',
  Sand: 'theme-mist',
  Ash: 'theme-mist',
  
  Default: 'theme-default'
};

export const useBackgroundTheme = (weatherData: IWeatherResponse | null): string => {
  return useMemo(() => {
    if (!weatherData) return themeMap.Default;
    
    const mainWeather = weatherData.weather[0]?.main;
    
    return themeMap[mainWeather] || themeMap.Default;
  }, [weatherData]);
};
