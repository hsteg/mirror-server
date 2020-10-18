class Weather {
  constructor() {}
  formattedObservationTime(weatherData) {
    return weatherData.observation_time.value;
  }
  formattedWeatherCode(weatherData) {
    return weatherData.weather_code.value;
  }
  formattedPrecipitationProbability(weatherData) {
    return weatherData.precipitation_probability.value;
  }  
  formattedPrecipitationType(weatherData) {
    return weatherData.precipitation_type.value;
  }  
}

module.exports = Weather;