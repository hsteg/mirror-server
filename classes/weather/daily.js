// const Weather = require('./weather');

class DailyWeather {
  constructor(weatherData) {
    // super();
    this.weatherData = weatherData;
  }

  formatWeather() {
    const data = this.weatherData.intervals.slice(0, 7);
    const days = [];

    data.forEach(el => {
      const formattedWeather = {
        'airTempHigh': this.formattedTemp(el.values.temperatureMax),
        'airTempLow': this.formattedTemp(el.values.temperatureMin),
        'realFeelHigh': this.formattedTemp(el.values.temperatureApparentMax),
        'realFeelLow': this.formattedTemp(el.values.temperatureApparentMin),
        'observationTime': this.formattedObservationTime(el.startTime),
        'precipitationProbability': this.formattedRoundedPercent(el.values.precipitationProbability),
        'weatherCode': this.formattedWeatherCode(el.values.weatherCode),
      };

      days.push(formattedWeather);
    })
    return days;
  }

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
}

module.exports = DailyWeather;
