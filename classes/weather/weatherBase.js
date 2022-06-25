const { default: Axios } = require("axios");

class WeatherBase {
  constructor() {}

  formattedTemp(temp) {
    return `${Math.round(temp)}°`;
  }
  formattedRoundedPercent(num) {
    return `${Math.round(num)}%`;
  }
  formattedObservationTime(observationTime) {
    // not sure we need this
    return observationTime;
  }
  formattedWeatherCode(weatherCode) {
    // not sure we need this
    return weatherCode;
  }
  formattedSunrise(sunriseTime) {
    // change this to readable EST
    return sunriseTime;
  }
  formattedPrecipitationType(precipitationType) {
    // this gonna need some work
    // translations to precip type?
    return precipitationType;
  }
}

module.exports = WeatherBase;