import document from 'document';

import { requestWeatherFromCompanion } from './weather';//'./index';
console.log("/app/settings1");
let weatherIntervalId = null;

const onWeatherZipCodeSettingChanged = (newValue) => {
  console.log(newValue);
  // parse the new value then request another fetch from the API with it
  const weatherZipCode = JSON.parse(newValue).name.replace(/"/g, '');
console.log(weatherZipCode);
  // if we already have an interval, clear it
  if (weatherIntervalId) {
    clearInterval(weatherIntervalId);
    weatherIntervalId = null;
  }
console.log("/app/settings2");
  console.log(weatherZipCode);
  // if we've been given a zip code, request the weather and then set an interval
  if (weatherZipCode && weatherZipCode !== '') {
    requestWeatherFromCompanion(weatherZipCode);

    // fetch weather every hour
    weatherIntervalId = setInterval(
      () => { requestWeatherFromCompanion(weatherZipCode); },
      30 // minutes
      * 60 // seconds
      * 1000 // milliseconds
    );
  }
};

// Called whenever a SETTING_CHANGED event gets sent
// Note that on watchface init, every setting that has a value
// will go through here which will set all the colors etc.
export const onSettingChanged = ({ key, newValue }) => {
  switch (key) {
    case 'weatherZipCode':
      onWeatherZipCodeSettingChanged(newValue);
      break;
    default:
      console.warn(`Unknown setting for ${key} with value ${newValue}`);
      break;
  }
};
