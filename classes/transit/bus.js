const { default: Axios } = require("axios");

class BusTime {
  constructor(stopId) {
    this.stopId = stopId;
    this.apiUrl = `http://bustime.mta.info/api/siri/stop-monitoring.json?key=${process.env.MTA_BUS_KEY}&OperatorRef=MTA&MonitoringRef=${this.stopId}&LineRef=MTA%20NYCT_B62&MaximumStopVisits=3`;
  }

  async getBusTime() {
    try {
      const response = await Axios.get(this.apiUrl);
      return this.processBusTimes(response.data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit);
    } catch (error) {
      return error;
    }
  }

  processBusTimes(busTimes) {
    const formattedTimes = [];
    
    busTimes.forEach(busData => {
      let newBusData = {};
      const distanceInfo = busData.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances;
      const presentableDistance = this.processBusDistance(distanceInfo.PresentableDistance);

      newBusData.stopsAway = distanceInfo.StopsFromCall;
      newBusData.readableDistanceNumber = presentableDistance.number;
      newBusData.readableDistanceUnits = presentableDistance.units;
      newBusData.expectedArrivalTime = busData.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;

      formattedTimes.push(newBusData);
    })

    return formattedTimes;
  }

  processBusDistance(busDistance) {
    const presentableDistance = {};
    const splitDistanceString = busDistance.split(' ');


    switch (splitDistanceString[0]) {
      case 'approaching':
        presentableDistance.number = 'approaching';
        presentableDistance.units = '';
        break;
      case '<':
        presentableDistance.number = `${splitDistanceString[0]}${splitDistanceString[1]}`;
        presentableDistance.units = splitDistanceString.slice(2).join(' ');
        break;
      case 'at':
        presentableDistance.number = `${splitDistanceString[0]} ${splitDistanceString[1]}`;
        presentableDistance.units = '';
        break;
      default:
        presentableDistance.number = splitDistanceString[0];
        presentableDistance.units = splitDistanceString.slice(1).join(' ');
        break;
    }

    return presentableDistance;
  }
}

module.exports = BusTime;