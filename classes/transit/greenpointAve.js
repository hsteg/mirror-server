const { createClient } = require('mta-realtime-subway-departures');

class GreenpointAve {
  constructor() {
    this.client = createClient(process.env.MTA_GTFS_KEY);
    // greenpoint ave mta station id
    this.stationId = 283;
    this.stationTranslations = {
      '281': 'Court Square',
      '243': 'Church Ave',
      '-1': 'N/A'
    }
  }

  async getTransit() {
    try {
      const departures = await this.client.departures(this.stationId);
      return this.processTrainTimes(departures);
    } catch (error) {
      return error;
    }
  }

  processTrainTimes(trainTimes) {
    const departures = trainTimes.lines[0].departures;
    const orderedDepartures = this.sortTrainTimes(departures);
    const translatedOrderedDepartures = this.translateDestinationStation(orderedDepartures);

    return translatedOrderedDepartures.slice(0, 10);
  }

  sortTrainTimes(departures) {
    const orderedFlattenedDepartures = departures.N.
      concat(departures.S).
        sort((a, b) => {
          return a.time - b.time;
        });

    return orderedFlattenedDepartures;
  }

  translateDestinationStation(departures) {
    for (let i = 0; i < departures.length; i++) {
      if (departures[i].destinationStationId) {
        departures[i].destinationStation = this.stationTranslations[departures[i].destinationStationId];
      } else {
        departures[i].destinationStation = this.stationTranslations['-1'];
      }
    }

    return departures;
  }
}

module.exports = GreenpointAve;