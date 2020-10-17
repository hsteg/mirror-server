const { default: Axios } = require("axios");
const moment = require('moment');

class HourlyWeather {
  constructor() {
    this.oneHourFromNow = moment().add(1, 'h').toISOString();
    this.eightHrsFromNow = moment().add(8, 'h').toISOString();
    this.apiUrl = `https://api.climacell.co/v3/weather/forecast/hourly?lat=${process.env.MY_LAT}&lon=${process.env.MY_LONG}&unit_system=us&start_time=${this.oneHourFromNow}&end_time=${this.eightHrsFromNow}&fields=feels_like%2Ctemp%2Cprecipitation_probability%2Cprecipitation_type%2Csunrise%2Cweather_code&apikey=${process.env.CLIMACELL_KEY}`
  }

  async getWeather() {
    try {
      const response = await Axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = HourlyWeather;