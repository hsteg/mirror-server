class Weather {
  constructor() {}
  formattedObservationTime(weatherData) {
    return weatherData.observation_time.value;
  }
  formattedWeatherCode(weatherData) {
    return weatherData.weather_code.value;
  }
  formattedPrecipitationProbability(weatherData) {
    return `${Math.round(weatherData.precipitation_probability.value)}%`;
  }
  formattedPrecipitationType(weatherData) {
    return weatherData.precipitation_type.value;
  }
  formattedTemp(temp) {
    return `${Math.round(temp)}°`;
  }
  formattedRealFeel(weatherData) {
    const temp =  weatherData.feels_like.value;
    return this.formattedTemp(temp);
  }
  formattedAirTemp(weatherData) {
    const temp = weatherData.temp.value;
    return this.formattedTemp(temp);
  }
  formattedSunrise(weatherData) {
    return weatherData.sunrise.value;
  }
}

module.exports = Weather;