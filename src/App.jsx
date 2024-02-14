// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState({
    city: 'Denver',
    temp: '51°C',
    icon: '',
    description: 'Cloudy',
    humidity: '60%',
    wind: '6.2 km/h',
    loading: true,
  });

  const apikey = '53e4005e2045a35f311a47172d09c600';

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );

      const data = response.data;
      displayWeather(data);
      fetchBackgroundImage(city); // Fetch background image after fetching weather data
    } catch (error) {
      console.error(error);
    }
  };

  const displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    setWeatherData({
      city: name,
      temp: `${temp}°C`,
      icon: `https://openweathermap.org/img/wn/${icon}.png`,
      description: description,
      humidity: `Humidity: ${humidity}%`,
      wind: `Wind speed: ${speed} km/h`,
      loading: false,
    });
  };

  const fetchBackgroundImage = async (city) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${city}&client_id=YGFNCDk346GSceCrZzIJXU_niLoHLJHqsRorfmlAzMM`
      );

      const imageData = response.data;
      const imageUrl = imageData.urls.regular;

      document.body.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
      console.error(error);
    }
  };

  const search = () => {
    fetchWeather(document.querySelector('.search-bar').value);
  };

  const handleButtonClick = () => {
    search();
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    fetchWeather('Tokyo');
  }, []);

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          onKeyUp={handleEnterKey}
        />
        <button onClick={handleButtonClick}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ... SVG path data ... */}
          </svg>
        </button>
      </div>
      <div className={`weather ${weatherData.loading ? 'loading' : ''}`}>
        <h2 className="city">Weather in {weatherData.city}</h2>
        <h1 className="temp">{weatherData.temp}</h1>
        <div className="flex">
          <img src={weatherData.icon} alt="" className="icon" />
          <div className="description">{weatherData.description}</div>
        </div>
        <div className="humidity">{weatherData.humidity}</div>
        <div className="wind">{weatherData.wind}</div>
      </div>
    </div>
  );
};

export default App;
