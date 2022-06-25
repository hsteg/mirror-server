const { default: Axios } = require("axios");
const CurrentWeather = require('./current');
const HourlyWeather = require('./hourly');
const DailyWeather = require('./daily');

class Weather {
  constructor() {
    this.apiUrl = `https://api.tomorrow.io/v4/timelines?location=${process.env.MY_LAT},${process.env.MY_LONG}&fields=temperature,temperatureMax,temperatureMin,temperatureApparent,temperatureApparentMax,temperatureApparentMin,cloudCover,humidity,moonPhase,precipitationIntensity,precipitationType,windGust,windSpeed,windDirection,weatherCode,precipitationProbability,sunriseTime,sunsetTime,uvIndex,uvIndexMax&timesteps=current,1h,1d&units=imperial&apikey=${process.env.CLIMACELL_KEY}`;
  }

  async getWeather() {
    try {
      const response = await Axios.get(this.apiUrl);

      return this.formattedWeather(response.data.data);
    } catch (error) {
      return error;
    }
  }

  formattedWeather(weatherData) {
    const currentWeather = new CurrentWeather(this.pluckSelectedWeather('current', weatherData));
    const hourlyWeather = new HourlyWeather(this.pluckSelectedWeather('1h', weatherData));
    const dailyWeather = new DailyWeather(this.pluckSelectedWeather('1d', weatherData));

    return {
      currentWeather: currentWeather.formatWeather(),
      hourlyWeather: hourlyWeather.formatWeather(),
      dailyWeather: dailyWeather.formatWeather()
    };
  }

  pluckSelectedWeather(selection, data) {
    return data.timelines.find(el => el.timestep === selection);
  }
}

module.exports = Weather;