import { IWeatherState, TWeatherAction } from './types';

export const initialWeatherState: IWeatherState = {
  data: null,
  isLoading: false,
  error: null,
  city: ''
};

export const weatherReducer = (state: IWeatherState, action: TWeatherAction): IWeatherState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
        city: action.payload
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload
      };
    default:
      return state;
  }
};