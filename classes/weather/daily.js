const { default: Axios } = require("axios");
const moment = require('moment');
const Weather = require('./weather');

class DailyWeather extends Weather {
  constructor() {
    super();
    this.sevenHoursFromNow = moment().add(7, 'd').toISOString();
    this.apiUrl = `https://api.climacell.co/v3/weather/forecast/daily?lat=${process.env.MY_LAT}&lon=${process.env.MY_LONG}&unit_system=us&start_time=now&end_time=${this.sevenHoursFromNow}&fields=temp%2Cfeels_like%2Cprecipitation_probability%2Csunrise%2Csunset%2Cweather_code&apikey=${process.env.CLIMACELL_KEY}`;
  }

  async getWeather() {
    try {
      const response = await Axios.get(this.apiUrl);
      return this.formatWeather(response.data)
    } catch (error) {
      return error;
    }
  }

  formatWeather(weatherData) {
    const days = [];
    weatherData.forEach(el => {
      const formattedWeather = {
        'airTempHigh': this.formattedAirTempHigh(el),
        'airTempLow': this.formattedAirTempLow(el),
        'realFeelHigh': this.formattedRealFeelHigh(el),
        'realFeelLow': this.formattedRealFeelLow(el),
        'observationTime': this.formattedObservationTime(el),
        'precipitationProbability': this.formattedPrecipitationProbability(el),
        'weatherCode': this.formattedWeatherCode(el),
      };

      days.push(formattedWeather);
    })
    return days;
  }

  formattedRealFeelHigh(weatherData) {
    const temp = weatherData.feels_like[1].max.value;
    return this.formattedTemp(temp);
  }
  formattedRealFeelLow(weatherData) {
    const temp = weatherData.feels_like[0].min.value;
    return this.formattedTemp(temp);
  }
  formattedAirTempHigh(weatherData) {
    const temp = weatherData.temp[1].max.value;
    return this.formattedTemp(temp);
  }
  formattedAirTempLow(weatherData) {
    const temp = weatherData.temp[0].min.value;
    return this.formattedTemp(temp);
  }
}

module.exports = DailyWeather;