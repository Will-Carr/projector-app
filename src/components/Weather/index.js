// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Weather.css";
import {
  DayThunderstorm,
  NightThunderstorm,
  Drizzle,
  DayRain,
  NightRain,
  Sleet,
  Snow,
  Fog,
  Tornado,
  DayClear,
  NightClear,
  DayCloud,
  NightCloud,
} from "../../icons";

const Weather = () => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const lat = process.env.REACT_APP_WEATHER_LAT;
  const lon = process.env.REACT_APP_WEATHER_LON;
  const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`;

  const [currentTemp, setCurrentTemp] = useState();
  const [lowTemp, setLowTemp] = useState();
  const [highTemp, setHighTemp] = useState();
  const [weatherIcon, setWeatherIcon] = useState();

  useEffect(() => {
    const getWeatherData = () => {
      // eslint-disable-next-line no-undef
      fetch(url)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Bad fetch");
          }
          return resp.json();
        })
        .then((data) => {
          // Current temperature
          const returnedCurrentTemp = parseInt(data.current.temp);
          setCurrentTemp(returnedCurrentTemp);

          // Daily Low and High
          const returnedLowTemp = parseInt(data.daily[0].temp.min);
          setLowTemp(returnedLowTemp);
          const returnedHighTemp = parseInt(data.daily[0].temp.max);
          setHighTemp(returnedHighTemp);

          // Determine if it's day or night
          const curTime = data.current.dt;
          const sunrise = data.daily[0].sunrise;
          const sunset = data.daily[0].sunset;
          const isDay = curTime > sunrise && curTime < sunset;

          // Set our weather icon
          // Weather code list: https://openweathermap.org/weather-conditions
          const weatherCode = data.current.weather[0].id;

          // Thunderstorms
          if (weatherCode >= 200 && weatherCode < 300) {
            setWeatherIcon(isDay ? <DayThunderstorm /> : <NightThunderstorm />);
          }
          // Drizzle
          else if (
            (weatherCode >= 300 && weatherCode < 400) ||
            weatherCode === 701
          ) {
            setWeatherIcon(<Drizzle />);
          }
          // Rain
          else if (
            weatherCode >= 500 &&
            weatherCode < 600 &&
            weatherCode !== 511
          ) {
            setWeatherIcon(isDay ? <DayRain /> : <NightRain />);
          }
          // Freezing Rain / Sleet
          else if (
            weatherCode === 511 ||
            (weatherCode >= 611 && weatherCode < 617)
          ) {
            setWeatherIcon(<Sleet />);
          }
          // Snow
          else if (
            (weatherCode >= 600 && weatherCode < 611) ||
            (weatherCode >= 617 && weatherCode < 700)
          ) {
            setWeatherIcon(<Snow />);
          }
          // Smoke / Haze / Fog / etc
          else if (weatherCode >= 702 && weatherCode < 771) {
            setWeatherIcon(<Fog />);
          }
          // Squall / Tornado
          else if (weatherCode >= 771 && weatherCode < 800) {
            setWeatherIcon(<Tornado />);
          }
          // Clear
          else if (weatherCode === 800) {
            setWeatherIcon(isDay ? <DayClear /> : <NightClear />);
          }
          // Clouds
          else if (weatherCode >= 801 && weatherCode < 900) {
            setWeatherIcon(isDay ? <DayCloud /> : <NightCloud />);
          }
        })
        .catch(() => {
          // TODO: handle
        });
    };

    // Initialize with the data
    getWeatherData();

    // Refresh every 5 minutes
    const interval = setInterval(() => {
      getWeatherData();
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentTemp, setLowTemp, setHighTemp, setWeatherIcon]);

  return (
    <div id="weather">
      <div id="weather-icon">{weatherIcon}</div>
      <div id="cur-temp">
        <span>{currentTemp}°</span>
      </div>
      <div id="high-low-temp">
        <div>
          <span>Hi: {highTemp}°</span>
        </div>
        <div>
          <span>Lo: {lowTemp}°</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
