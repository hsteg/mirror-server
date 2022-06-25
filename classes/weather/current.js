const WeatherBase = require('./weatherBase');

class CurrentWeather extends WeatherBase {
  constructor(weatherData) {
    super();
    this.weatherData = weatherData;
  }

  formatWeather() {
    let data = this.weatherData.intervals[0].values;

    const formattedWeather = {
      'airTemp': this.formattedTemp(data.temperature),
      'realFeel': this.formattedTemp(data.temperatureApparent),
      'cloudCover': this.formattedRoundedPercent(data.cloudCover),
      'humidity': this.formattedRoundedPercent(data.humidity),
      'moonPhase': this.formattedMoonPhase(data.moonPhase),
      'precipitationAmount': this.formattedPrecipitationAmount(data.precipitationIntensity),
      'precipitationType': this.formattedPrecipitationType(data.precipitationType),
      'sunrise': this.formattedSunrise(data.sunriseTime),
      'sunset': this.formattedSunset(data.sunsetTime),
      'windGust': this.formattedWindGust(data.windGust),
      'windSpeed': this.formattedWindSpeed(data.windSpeed),
      'windDirection': this.formattedWindDirection(data.windDirection),
      // 'airQuality': this.formattedAirQuality(data.),
      'weatherCode': this.formattedWeatherCode(data.weatherCode),
      'observationTime': this.formattedObservationTime(data.startTime),

      // uvIndex, uvIndexMax
      // precipitationProbability is new

      // weatherCodeDay, weatherCodeNight are now available but not used here, yet.
    };

    return formattedWeather;
  }

  formattedMoonPhase(moonPhase) {
    // this gonna need work
    // translations to moonphase
    return moonPhase;
  }
  formattedPrecipitationAmount(precipitationIntensity) {
    // this gonna need some work
    // maybe add units/hr?
    return precipitationIntensity;
  }
  formattedSunset(sunsetTime) {
    // change this to readable EST
    return sunsetTime;
  }
  formattedWindGust(windGust) {
    // format this
    // is it mph? knots?
    return windGust;
  }
  formattedWindSpeed(windSpeed) {
    // format this
    // mph, knots?
    return windSpeed;
  }
  formattedWindDirection(windDirection) {
  // const directionInDegrees = weatherData.wind_direction.value;
  // const cardinalDirection = this.cardinalWindDirection(directionInDegrees);
  // return cardinalDirection;

  // honeslty probably the same as it was, j ust returning the number for now
    return windDirection;
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
