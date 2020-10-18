const { default: Axios } = require("axios");
const moment = require('moment');
const Weather = require('./weather');

class HourlyWeather extends Weather {
  constructor() {
    super();
    this.oneHourFromNow = moment().add(1, 'h').toISOString();
    this.eightHrsFromNow = moment().add(8, 'h').toISOString();
    this.apiUrl = `https://api.climacell.co/v3/weather/forecast/hourly?lat=${process.env.MY_LAT}&lon=${process.env.MY_LONG}&unit_system=us&start_time=${this.oneHourFromNow}&end_time=${this.eightHrsFromNow}&fields=feels_like%2Ctemp%2Cprecipitation_probability%2Cprecipitation_type%2Csunrise%2Cweather_code&apikey=${process.env.CLIMACELL_KEY}`
  }

  async getWeather() {
    try {
      const response = await Axios.get(this.apiUrl);
      return this.formatWeather(response.data);
    } catch (error) {
      return error;
    }
  }

  formatWeather(weatherData) {
    const hours = [];
    weatherData.forEach(el => {
      const formattedWeather = {
        'observationTime': this.formattedObservationTime(el),
        'realFeel': this.formattedRealFeel(el),
        'airTemp': this.formattedAirTemp(el),
        'precipitationProbability': this.formattedPrecipitationProbability(el),
        'precipitationType': this.formattedPrecipitationType(el),
        'weatherCode': this.formattedWeatherCode(el),
        'sunrise': this.formattedSunrise(el)
      };
      hours.push(formattedWeather);
    })

    return hours;
  }

  formattedRealFeel(weatherData) {
    return weatherData.feels_like.value;
  }
  formattedAirTemp(weatherData) {
    return weatherData.temp.value;
  }
  formattedSunrise(weatherData) {
    return weatherData.sunrise.value;
  }
}

module.exports = HourlyWeather;