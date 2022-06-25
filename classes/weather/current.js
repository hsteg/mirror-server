const { default: Axios } = require("axios");
const Weather = require('./weather');

class CurrentWeather extends Weather {
  constructor() {
    super();
    // this.apiUrl = `https://api.climacell.co/v3/weather/realtime?lat=${process.env.MY_LAT}&lon=${process.env.MY_LONG}&unit_system=us&fields=precipitation%2Ctemp%2Cfeels_like%2Chumidity%2Cwind_speed%2Cwind_direction%2Cwind_gust%2Cprecipitation_type%2Csunrise%2Csunset%2Cvisibility%2Ccloud_cover%2Cmoon_phase%2Cweather_code%2Cepa_health_concern&apikey=${process.env.CLIMACELL_KEY}`;
    this.apiUrl = `https://api.tomorrow.io/v4/timelines?location=${process.env.MY_LAT},${process.env.MY_LONG}&fields=temperature,temperatureMax,temperatureMin,temperatureApparent,temperatureApparentMax,temperatureApparentMin,cloudCover,humidity,moonPhase,precipitationIntensity,precipitationType,windGust,windSpeed,windDirection,weatherCode,precipitationProbability,sunriseTime,sunsetTime,uvIndex,uvIndexMax&timesteps=current,1h,1d&units=imperial&apikey=${process.env.CLIMACELL_KEY}`;
    // sunrise and sunset missing
  }

  async getWeather() {
    try {
      const response = await Axios.get (this.apiUrl);
      console.log(response.data);
      return response.data;
      // return this.formatWeather(response.data);
    } catch (error) {
      return error;
    }
  }

  formatWeather(weatherData) {
    const formattedWeather = {
      'airTemp': this.formattedAirTemp(weatherData),
      'realFeel': this.formattedRealFeel(weatherData),
      'cloudCover': this.formattedCloudCover(weatherData),
      'humidity': this.formattedHumidity(weatherData),
      'moonPhase': this.formattedMoonPhase(weatherData),
      'precipitationAmount': this.formattedPrecipitationAmount(weatherData),
      'precipitationType': this.formattedPrecipitationType(weatherData),
      'sunrise': this.formattedSunrise(weatherData),
      'sunset': this.formattedSunset(weatherData),
      'windGust': this.formattedWindGust(weatherData),
      'windSpeed': this.formattedWindSpeed(weatherData),
      'windDirection': this.formattedWindDirection(weatherData),
      // 'airQuality': this.formattedAirQuality(weatherData),
      'weatherCode': this.formattedWeatherCode(weatherData),
      // 'observationTime': this.formattedObservationTime(weatherData),

      // uvIndex, uvIndexMax
      // precipitationProbability is new

      // weatherCodeDay, weatherCodeNight are now available but not used here, yet.
    };

    return formattedWeather;
  }

  formattedCloudCover(weatherData) {
    return `${Math.round(weatherData.cloud_cover.value)}%`;
  }
  formattedHumidity(weatherData) {
    return `${Math.round(weatherData.humidity.value)}%`;
  }
  formattedMoonPhase(weatherData) {
    const moonPhase = weatherData.moon_phase.value.split('_').map(moonPhase => {
      return moonPhase.charAt(0).toUpperCase() + moonPhase.slice(1);
    });
    return moonPhase.join(' ');

  }
  formattedPrecipitationAmount(weatherData) {
    return `${weatherData.precipitation.value}`;
  }
  formattedSunset(weatherData) {
    return weatherData.sunset.value;
  }
  formattedWindGust(weatherData) {
    return Math.round(weatherData.wind_gust.value);
  }
  formattedWindSpeed(weatherData) {
    return Math.round(weatherData.wind_speed.value);
  }
  formattedWindDirection(weatherData) {
  const directionInDegrees = weatherData.wind_direction.value;
  const cardinalDirection = this.cardinalWindDirection(directionInDegrees);
  return cardinalDirection;
  }
  cardinalWindDirection(directionInDegrees) {
    let cardinalDirection;

    if (directionInDegrees > 0 && directionInDegrees <= 22.5) {
      cardinalDirection = "N";
    } else if (directionInDegrees > 22.5 && directionInDegrees <= 67.5) {
      cardinalDirection = "NE"
    } else if (directionInDegrees > 67.5 && directionInDegrees <= 112.5) {
      cardinalDirection = "E"
    } else if (directionInDegrees > 112.5 && directionInDegrees <= 157.5) {
      cardinalDirection = "SE"
    } else if (directionInDegrees > 157.5 && directionInDegrees <= 202.5) {
      cardinalDirection = "S"
    } else if (directionInDegrees > 202.5 && directionInDegrees <= 247.5) {
      cardinalDirection = "SW"
    } else if (directionInDegrees > 247.5 && directionInDegrees <= 292.5) {
      cardinalDirection = "W"
    } else if (directionInDegrees > 292.5 && directionInDegrees <= 337.5) {
      cardinalDirection = "NW"
    } else if (directionInDegrees > 337.5 && directionInDegrees <= 360) {
      cardinalDirection = "N"
    }

    return cardinalDirection;
  }
  formattedAirQuality(weatherData) {
    return weatherData.epa_health_concern.value;
  }
}

module.exports = CurrentWeather;