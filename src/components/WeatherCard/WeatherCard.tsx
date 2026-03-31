import { FC, memo } from 'react';
import { useWeatherStatus, useWeatherData } from '@hooks/useWeather';
import styles from './WeatherCard.module.scss';

const WeatherCardComponent: FC = () => {
  const { isLoading, error } = useWeatherStatus();
  const weatherData = useWeatherData();

  if (isLoading) {
    return (
      <section className={styles.container} aria-live="polite" aria-busy="true">
        <div className={styles.loading}>Loading weather data...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.container} aria-live="assertive">
        <div className={styles.error} role="alert">
          {error}
        </div>
      </section>
    );
  }

  if (!weatherData) {
    return (
      <section className={styles.container}>
        <div className={styles.prompt}>
          Enter a city name to check the weather.
        </div>
      </section>
    );
  }

  const { name, main, weather, wind, sys } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  console.log('WeatherCard');

  return (
    <section className={styles.container} aria-label={`Weather in ${name}`}>
      <article className={styles.card}>
        <header className={styles.header}>
          <h2 className={styles.cityName}>{name}, {sys.country}</h2>
          <div className={styles.date}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>
        
        <div className={styles.mainInfo}>
          <div className={styles.tempContainer}>
            <img src={iconUrl} alt={weather[0].description} className={styles.icon} loading="lazy" />
            <span className={styles.temperature}>{Math.round(main.temp)}°C</span>
          </div>
          <p className={styles.description} style={{ textTransform: 'capitalize' }}>
            {weather[0].description}
          </p>
        </div>

        <footer className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Humidity</span>
            <span className={styles.value}>{main.humidity}%</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Wind</span>
            <span className={styles.value}>{wind.speed} m/s</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Feels Like</span>
            <span className={styles.value}>{Math.round(main.feels_like)}°C</span>
          </div>
        </footer>
      </article>
    </section>
  );
};

export const WeatherCard = memo(WeatherCardComponent);