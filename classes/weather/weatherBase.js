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
    return sunriseTime;
  }
  formattedPrecipitationType(precipitationType) {
    const precipTypes = {
      0: "None",
      1: "Rain",
      2: "Snow",
      3: "Freezing Rain",
      4: "Ice Pellets / Sleet"
    }
    return precipTypes[precipitationType];
  }
}

module.exports = WeatherBase;