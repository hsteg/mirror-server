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
      'epaHealthConcern': this.formattedEpaHealthConcern(data.epaHealthConcern),
      'humidity': this.formattedRoundedPercent(data.humidity),
      'moonPhase': this.formattedMoonPhase(data.moonPhase),
      'observationTime': this.formattedObservationTime(this.weatherData.intervals[0].startTime),
      'precipitationAmount': this.formattedPrecipitationAmount(data.precipitationIntensity),
      'precipitationType': this.formattedPrecipitationType(data.precipitationType),
      'sunrise': this.formattedSunrise(data.sunriseTime),
      'sunset': this.formattedSunset(data.sunsetTime),
      'windGust': this.formattedRoundedMph(data.windGust),
      'windSpeed': this.formattedRoundedMph(data.windSpeed),
      'windDirection': this.formattedWindDirection(data.windDirection),
      'weatherCode': this.formattedWeatherCode(data.weatherCode)

      // uvIndex, uvIndexMax
      // precipitationProbability is new

      // weatherCodeDay, weatherCodeNight are now available but not used here, yet.
    };

    return formattedWeather;
  }

  formattedMoonPhase(moonPhase) {
    const moonPhases = {
      0: "New",
      1: "Waxing Crescent",
      2: "First Quarter",
      3: "Waxing Gibbous",
      4: "Full",
      5: "Waning Gibbous",
      6: "Third Quarter",
      7: "Waning Crescent"
    }
    return moonPhases[moonPhase];
  }
  formattedEpaHealthConcern(epaHealthConcern) {
    const healthConcerns = {
      0: "Good",
      1: "Moderate",
      2: "Unhealthy for Sensitive Groups",
      3: "Unhealthy",
      4: "Very Unhealthy",
      5: "Hazardous"
    }
    return healthConcerns[epaHealthConcern];
  }
  formattedPrecipitationAmount(precipitationIntensity) {
    return `${precipitationIntensity} in/hr`;
  }
  formattedRoundedMph(mph) {
    return `${Math.round(mph)} mph`;
  }
  formattedWindDirection(directionInDegrees) {
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
