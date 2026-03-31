import { FC, memo, FormEvent, useRef } from 'react';
import { useWeatherActions } from '@hooks/useWeather';
import { SearchIcon } from '@components/ui/icons/SearchIcon'; 
import styles from './SearchBar.module.scss';

const SearchBarComponent: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchWeather } = useWeatherActions();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value || '';
    if (!value.trim()) return;
    fetchWeather(value);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  console.log('SearchBar');

  return (
    <header className={styles.searchHeader}>
      <form onSubmit={handleSubmit} className={styles.searchForm} role="search">
        <label htmlFor="city-search" className={styles['visually-hidden']}>
          Search City
        </label>
        
        <input
          ref={inputRef}
          id="city-search"
          type="text"
          defaultValue=""
          placeholder="Search city..."
          className={styles.searchInput}
          aria-label="City name"
          autoComplete="off"
        />
        
        <button type="submit" className={styles.searchButton} aria-label="Search">
          <SearchIcon />
        </button>
      </form>
    </header>
  );
};

export const SearchBar = memo(SearchBarComponent);