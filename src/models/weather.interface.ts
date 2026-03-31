export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface IWeatherResponse {
  weather: IWeatherDescription[];
  main: IWeatherMain;
  wind: IWind;
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: ICoordinates;
}

export interface IWeatherState {
  data: IWeatherResponse | null;
  isLoading: boolean;
  error: string | null;
  city: string;
}

export type TWeatherAction =
  | { type: 'FETCH_START'; payload: string }
  | { type: 'FETCH_SUCCESS'; payload: IWeatherResponse }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_CITY'; payload: string };
