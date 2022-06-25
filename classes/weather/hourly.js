const WeatherBase = require('./weatherBase');

class HourlyWeather extends WeatherBase {
  constructor(weatherData) {
    super();
    this.weatherData = weatherData;
  }

  formatWeather() {
    const data = this.weatherData.intervals.slice(0, 10);
    const hours = [];

    data.forEach(el => {
      const formattedWeather = {
        'observationTime': this.formattedObservationTime(el.startTime),
        'realFeel': this.formattedTemp(el.values.temperatureApparent),
        'airTemp': this.formattedTemp(el.values.temperature),
        'precipitationProbability': this.formattedRoundedPercent(el.values.precipitationProbability),
        'precipitationType': this.formattedPrecipitationType(el.values.precipitationType),
        'weatherCode': this.formattedWeatherCode(el.values.weatherCode),
        'sunrise': this.formattedSunrise(el.values.sunriseTime),
        'sunset': this.formattedSunset(el.values.sunsetTime)
      };
      hours.push(formattedWeather);
    })

    return hours;
  }
}

module.exports = HourlyWeather;
