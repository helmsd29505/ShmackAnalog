import document from 'document';

import { FETCH_WEATHER } from '../common/commands';
import { sendToPeerSocket } from '../common/util';

const weatherLabel = document.getElementById('weatherLabel');

// weatherIcon_800 is our default icon that starts as shown and not hidden
let currentWeatherIconId = 'weatherIcon_800';

// Request weather data from the companion
// This is set in a timeout in settings.js when the zip code setting is read

export const requestWeatherFromCompanion = (zipCode) => {
  console.log("export const weather frm /app/weather")
  weatherLabel.text = '--°';

  sendToPeerSocket({
    command: FETCH_WEATHER,
    zipCode
  });
};

const getIconIdFromWeatherId = (weatherId) => {
  console.log("getIconIDFromWeather /app/weather");
  // see https://openweathermap.org/weather-conditions for a list of weather codes
  if (weatherId === 800) {
    // 800 is a special code for "clear"; everything else is just in a group
    return 'weatherIcon_800';
  }

  const weatherIdGroup = `${weatherId}`.substring(0, 1);
  return `weatherIcon_${weatherIdGroup}xx`;
};
console.log("prefetch weather");

export const onWeatherFetchSuccess = (data) => {
  console.log("weather fetch success frm /app/index")
  // round temperature up to a whole number
  const roundedTemperature = Math.floor(Math.round(data.temperature, 1));
  weatherLabel.text = `${roundedTemperature}°`;

  // hide the current icon
  console.log("hide icon frm /app/index");
  document.getElementById(currentWeatherIconId).style.display = 'none';
console.log("show icon data.weather frm /app/index");
  currentWeatherIconId = getIconIdFromWeatherId(data.weather);

  // show the new icon
  console.log("show icon frm /app/index");
  document.getElementById(currentWeatherIconId).style.display = 'inline';
};
