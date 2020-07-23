const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const axios = require('axios');
const { createClient } = require('mta-realtime-subway-departures');
const Mta = require('mta-gtfs');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`);
});

app.get('/weather', (req, res) => {
  getWeather().then(response => {
    res.send(response.data);
  }).catch(error => {
    console.log(error);
  })
});

app.get('/transit', (req, res) => {
  const client = createClient(process.env.MTA_GTFS_KEY);

  client.departures(283).then((response) => {
    res.send(response);
  });
});

app.get('/b62south', (req, res) => {
  getB62south().then(response => {
    const processed = processBusTimes(response);
    res.send(processed);
  }).catch(error => {
    console.log(error);
  })
})

app.get('/b62north', (req, res) => {
  getB62north().then(response => {
    const processed = processBusTimes(response);
    res.send(processed);
  }).catch(error => {
    console.log(error);
  })
})

app.get('/mtaStatus', (req, res) => {
  getMtaStatus().then(response => {
    const processed = processSubwayStatuses(response);
    res.send(processed);
  }).catch(error => {
    console.log(error);
  })
})

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${process.env.MY_LAT}&lon=${process.env.MY_LONG}&appid=${process.env.OPENWEATHER_KEY}&units=imperial`;
    const response = await axios.get(url);
    
    return response;
  } catch(error) {
    console.log(error);
  }
}

async function getB62south() {
  try {
    const url = `http://bustime.mta.info/api/siri/stop-monitoring.json?key=${process.env.MTA_BUS_KEY}&OperatorRef=MTA&MonitoringRef=305170&LineRef=MTA%20NYCT_B62&MaximumStopVisits=3`;
    const response = await axios.get(url);
    
    return response.data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit; 
  } catch(error) {
    return error;
  }
}

async function getB62north() {
  try {
    const url = `http://bustime.mta.info/api/siri/stop-monitoring.json?key=${process.env.MTA_BUS_KEY}&OperatorRef=MTA&MonitoringRef=305159&LineRef=MTA%20NYCT_B62&MaximumStopVisits=3`;
    const response = await axios.get(url);

    return response.data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit;
  } catch (error) {
    console.log(error)
  }
}

async function getMtaStatus() {
  try {
    const mta = new Mta({
      key: process.env.MTA_GTFS_KEY
    });

    const response = await mta.status();
    return response.subway;

  } catch (error) {
    console.log(error);
  }
}

function processSubwayStatuses(subwayStatuses) {
  const formattedStatuses = [];

  subwayStatuses.forEach(subwayStatus => {
    if (subwayStatus.name === "SIR") return;
    const formattedStatus = {};
    formattedStatus.color = subwayColors(subwayStatus.name);
    formattedStatus.lines = subwayStatus.name.split('');
    formattedStatus.status = subwayStatus.status;
    formattedStatuses.push(formattedStatus);
  })

  return formattedStatuses;
}

function subwayColors(subwayLine) {
  switch (subwayLine) {
    case "123":
      return '#EE352E'
    case "456":
      return '#00933C'
    case "7":
      return '#B933AD'
    case "ACE":
      return '#0039A6'
    case "BDFM":
      return '#FF6319'
    case "G":
      return '#6CBE45'
    case "JZ":
      return '#996633'
    case "L":
      return '#A7A9AC'
    case "NQR":
      return '#FCCC0A'
    case "S":
      return '#808183'
    default:
      break;
  }
}

function processBusTimes(busTimes) {
  const formattedTimes = [];

  busTimes.forEach(busData => {
    let newBusData = {};
    const distanceInfo = busData.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances;
    const presentableDistance = processBusDistance(distanceInfo.PresentableDistance);

    newBusData.stopsAway = distanceInfo.StopsFromCall;
    newBusData.readableDistanceNumber = presentableDistance.number;
    newBusData.readableDistanceUnits = presentableDistance.units;
    newBusData.expectedArrivalTime = busData.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;

    formattedTimes.push(newBusData);
  })
  
  return formattedTimes;
}

function processBusDistance(busDistance) {
  presentableDistance = {};
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

// listen on the port
// http://localhost:8000
app.listen(port)