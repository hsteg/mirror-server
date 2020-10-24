const Mta = require('mta-gtfs');

class MtaStatus {
  constructor() {
    this.mtaClient = new Mta({ key: process.env.MTA_GTFS_KEY });
    this.externalMtaStatusLink = 'http://mta.info/status/subway/';
    this.subwayColors = {
      '123': '#EE352E',
      '456': '#00933C',
      '7': '#B933AD',
      'ACE': '#0039A6',
      'BDFM': '#FF6319',
      'G': '#6CBE45',
      'JZ': '#996633',
      'L': '#A7A9AC',
      'NQR': '#FCCC0A',
      'S': '#808183'
    }
  }

  async getStatus() {
    try {
      const response = await this.mtaClient.status('subway');
      return this.processSubwayStatuses(response);
    } catch (error) {
      return error;
    }
  }

  processSubwayStatuses(subwayStatuses) {
    const formattedStatuses = [];

    subwayStatuses.forEach(subwayStatus => {
      if (subwayStatus.name === 'SIR') return;
      const formattedStatus = {};
      formattedStatus.color = this.subwayColors[subwayStatus.name];
      formattedStatus.externalStatusLink = `${this.externalMtaStatusLink}${subwayStatus.name}`
      formattedStatus.lines = subwayStatus.name.split('');
      formattedStatus.status = subwayStatus.status;
      formattedStatuses.push(formattedStatus);
    })

    return formattedStatuses;
  }
}

module.exports = MtaStatus;