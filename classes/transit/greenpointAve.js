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

  async getTransit(ledSign = false) {
    try {
      const departures = await this.client.departures(this.stationId);
      if (ledSign) {
        return departures.lines.length > 0 ? this.processLedTrainTimes(departures.lines[0].departures) : [];
      } else {
        return this.processTrainTimes(departures.lines[0].departures);
      }
    } catch (error) {
      return error;
    }
  }

  processTrainTimes(trainTimes) {
    const orderedDepartures = this.sortTrainTimes(trainTimes);

    return this.translateDestinationStationAndTime(orderedDepartures).slice(0, 10);
  }

  processLedTrainTimes(trainTimes) {
    return {
      n: this.formatTrainsForLed(trainTimes["N"].slice(0, 2)),
      s: this.formatTrainsForLed(trainTimes["S"].slice(0, 2))
    };
  }

  formatTrainsForLed(departures) {
    return departures.map(departure => this.timeDifferenceInMin(departure.time));
  }

  sortTrainTimes(departures) {
    const orderedFlattenedDepartures = departures.N.
      concat(departures.S).
        sort((a, b) => {
          return a.time - b.time;
        });

    return orderedFlattenedDepartures;
  }

  translateDestinationStationAndTime(departures) {
    for (let i = 0; i < departures.length; i++) {
      if (departures[i].destinationStationId) {
        departures[i].destinationStation = this.stationTranslations[departures[i].destinationStationId];
      } else {
        departures[i].destinationStation = this.stationTranslations['-1'];
      }
      departures[i].readableTime = this.timeDifferenceInMin(departures[i].time);
    }

    return departures;
  }

  timeDifferenceInMin(departure) {
    const nowTime = new Date(Date.now()).getTime();
    const departureTime = new Date(departure * 1000).getTime();
    const difference = (((departureTime - nowTime) / 1000) / 60);
    return Math.round(difference);
  }
}

module.exports = GreenpointAve;