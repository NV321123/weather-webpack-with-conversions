import { FC } from 'react';
import { WeatherProvider } from '@context/weather/provider';
import { SearchBar } from '@components/SearchBar/SearchBar';
import { WeatherCard } from '@components/WeatherCard/WeatherCard';
import { Background } from '@components/Background/Background';
import '@styles/global.scss';

const App: FC = () => {

  console.log('App');

  return (
    <WeatherProvider>
      <Background />
      <main className="app-container">
        <SearchBar />
        <WeatherCard />
      </main>
    </WeatherProvider>
  );
};

export default App;