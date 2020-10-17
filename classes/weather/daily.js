const { default: Axios } = require("axios");
const moment = require('moment');

class DailyWeather {
  constructor() {
    this.sevenHoursFromNow = moment().add(7, 'd').toISOString();
    this.apiUrl = `https://api.climacell.co/v3/weather/forecast/daily?lat=${process.env.MY_LAT}&lon=${process.env.MY_LONG}&unit_system=us&start_time=now&end_time=${this.sevenHoursFromNow}&fields=temp%2Cfeels_like%2Cprecipitation_probability%2Csunrise%2Csunset%2Cweather_code&apikey=${process.env.CLIMACELL_KEY}`;
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

module.exports = DailyWeather;