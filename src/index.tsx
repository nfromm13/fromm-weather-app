import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import getCurrentLocation from './hooks/location';
import WeatherCard from './components/weatherCard';
import LocationAutocomplete from './components/locationAutoComplete';
import ToggleSwitch from './components/toggleSwitch';
import TemperatureChart from './components/lineGraph';
import { LocationData, FrommWeatherData } from './interfaces';
import ApiHelper from './helpers/apiHelper';
import './index.css';


const App = () => {
  const currentDay = new Date().toISOString().slice(0, 10);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isWeekly, setIsWeekly] = useState(false);
  const [dailyWeatherData, setDailyWeatherData] = useState<FrommWeatherData | null>(null);
  const [fiveDayWeatherData, setFiveDayWeatherData] = useState<FrommWeatherData | null>(null);

  const getCurrentHourIndex = () => {
    const hour = new Date().getHours();
    return hour;
  };

  const currentHourIndex = getCurrentHourIndex();

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
    };

    fetchLocation();
  }, []);

  const handleLocationSelect = (location: LocationData | null) => {
    setCurrentLocation(location);
  };

  const handleSearch = async () => {
    if (currentLocation) {
      const apiHelper = new ApiHelper();
      try {
        const dailyWeatherData: FrommWeatherData = await apiHelper.getCurrentWeather(
          String(currentLocation.latitude),
          String(currentLocation.longitude),
          currentDay,
          timezone
        );
        const weeklyWeatherData: FrommWeatherData = await apiHelper.getFiveDayForecast(
          String(currentLocation.latitude),
          String(currentLocation.longitude),
          currentDay,
          timezone
        );
        setDailyWeatherData(dailyWeatherData);
        setFiveDayWeatherData(weeklyWeatherData);
      } catch (error) {
        throw new Error(`Error handling search: ${error}`);
      }
    }
  };

  const handleToggle = (value: boolean) => {
    setIsWeekly(value);
  };

  return (
    <div className="app-container">
      <LocationAutocomplete onLocationSelect={handleLocationSelect} />
      <button onClick={handleSearch} className="location-autocomplete-button">Search</button>

      {currentLocation ? (
        <h2 className="location-info">
          {currentLocation.city ? `${currentLocation.city}, ` : ''}{currentLocation.state || ''} {currentLocation.zip || ''} <br />
          <span className="coordinates">
            Latitude: {currentLocation.latitude} <br />
            Longitude: {currentLocation.longitude}
          </span>
        </h2>
      ) : (
        <h2>Please enter a valid location from the dropdown and hit Search.</h2>
      )}

      {dailyWeatherData && fiveDayWeatherData && (
        <>
          <WeatherCard
            temperature={dailyWeatherData.temperature[currentHourIndex]}
            humidity={dailyWeatherData.humidity[currentHourIndex]}
            windSpeed={dailyWeatherData.windSpeed[currentHourIndex]}
            realFeel={dailyWeatherData.apparentTemperature[currentHourIndex]}
            weatherCode={dailyWeatherData.weatherCode[currentHourIndex]}
          />

          <ToggleSwitch isWeekly={isWeekly} onToggle={handleToggle} />

          <TemperatureChart isWeekly={isWeekly} dailyWeather={dailyWeatherData} fiveDayWeather={fiveDayWeatherData} />
        </>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);