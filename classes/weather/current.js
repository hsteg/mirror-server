const { default: Axios } = require("axios");

class CurrentWeather {
  constructor() {
    this.apiUrl = `https://api.climacell.co/v3/weather/realtime?lat=${process.env.MY_LAT}&lon=${process.env.MY_LONG}&unit_system=us&fields=precipitation%2Ctemp%2Cfeels_like%2Chumidity%2Cwind_speed%2Cwind_direction%2Cwind_gust%2Cprecipitation_type%2Csunrise%2Csunset%2Cvisibility%2Ccloud_cover%2Cmoon_phase%2Cweather_code%2Cepa_health_concern&apikey=${process.env.CLIMACELL_KEY}`;
  }

  async getWeather() {
    try {
      const response = await Axios.get (this.apiUrl);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CurrentWeather;