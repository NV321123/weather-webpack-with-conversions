import { FC, memo } from 'react';
import { useWeatherData } from '@hooks/useWeather';
import { useBackgroundTheme } from '@hooks/useBackgroundTheme';
import styles from './Background.module.scss';

import clearJpg from '@assets/images/clear.jpg';
import cloudsJpg from '@assets/images/clouds.jpg';
import rainJpg from '@assets/images/rain.jpg';
import stormJpg from '@assets/images/storm.jpg';
import snowJpg from '@assets/images/snow.jpg';
import mistJpg from '@assets/images/mist.jpg';

const imageMap: Record<string, string> = {
  'theme-clear': clearJpg,
  'theme-clouds': cloudsJpg,
  'theme-rain': rainJpg,
  'theme-storm': stormJpg,
  'theme-snow': snowJpg,
  'theme-mist': mistJpg,
};

const BackgroundComponent: FC = () => {
  const weatherData = useWeatherData();
  const themeClass = useBackgroundTheme(weatherData);
  const imgSrc = imageMap[themeClass];

  if (!imgSrc) return null;

  const isProduction = process.env.NODE_ENV === 'production';

  const webpSrc = isProduction ? imgSrc.replace(/\.jpg$/i, '.webp') : '';
  const avifSrc = isProduction ? imgSrc.replace(/\.jpg$/i, '.avif') : '';

  console.log('Background');

  return (
    <div className={`${styles.backgroundContainer} ${styles[themeClass]}`} aria-hidden="true">
      <picture className={styles.imageWrapper}>

        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        
        <img 
          src={imgSrc} 
          className={styles.backgroundImage} 
          alt="Weather background" 
        />
      </picture>
      <div className={styles.overlay}></div>
    </div>
  );
};

export const Background = memo(BackgroundComponent);