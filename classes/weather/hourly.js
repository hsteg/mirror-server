// const Weather = require('./weather');

class HourlyWeather {
  constructor(weatherData) {
    this.weatherData = weatherData;
  }

  formatWeather() {
    const data = this.weatherData.intervals.slice(0, 8);
    const hours = [];

    data.forEach(el => {
      const formattedWeather = {
        'observationTime': this.formattedObservationTime(el.startTime),
        'realFeel': this.formattedTemp(el.values.temperatureApparent),
        'airTemp': this.formattedTemp(el.values.temperature),
        'precipitationProbability': this.formattedRoundedPercent(el.values.precipitationProbability),
        'precipitationType': this.formattedPrecipitationType(el.values.precipitationType),
        'weatherCode': this.formattedWeatherCode(el.values.weatherCode),
        'sunrise': this.formattedSunrise(el.values.sunrise)
      };
      hours.push(formattedWeather);
    })

    return hours;
  }

  formattedTemp(temp) {
    return `${Math.round(temp)}°`;
  }
  formattedRoundedPercent(num) {
    return `${Math.round(num)}%`;
  }
  formattedPrecipitationType(precipitationType) {
    // this gonna need some work
    // translations to precip type?
    return precipitationType;
  }
  formattedWeatherCode(weatherCode) {
    // not sure we need this
    return weatherCode;
  }
  formattedSunrise(sunriseTime) {
    // change this to readable EST
    return sunriseTime;
  }
  formattedObservationTime(observationTime) {
    // not sure we need this
    return observationTime;
  }
}

module.exports = HourlyWeather;
