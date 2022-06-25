const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const axios = require('axios');

const GreenpointAve = require('./classes/transit/greenpointAve');
const MtaStatus = require('./classes/transit/mtaStatus');
const BusTime = require('./classes/transit/bus');
const Weather = require('./classes/weather/weather');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`);
});

app.get('/transit', (req, res) => {
  const greenpointAve = new GreenpointAve();

  greenpointAve.getTransit().then(response => {
    res.send(response);
  }).catch(error => {
    console.log(error);
  })
});

app.get('/b62south', (req, res) => {
  const stationId = '305170';
  const busTime = new BusTime(stationId)

  busTime.getBusTime().then(response => {
    res.send(response);
  }).catch(error => {
    console.log(error);
  })
})

app.get('/b62north', (req, res) => {
  const stationId = '305159';
  const busTime = new BusTime(stationId)

  busTime.getBusTime().then(response => {
    res.send(response);
  }).catch(error => {
    console.log(error);
  })
})

app.get('/mtaStatus', (req, res) => {
  const mtaStatus = new MtaStatus();

  mtaStatus.getStatus().then(response => {
    res.send(response);
  }).catch(error => {
    console.log(error);
  });
})

app.get('/weather', (req, res) => {
  const weather = new Weather();

  weather.getWeather().then(response => {
    res.send(response);
  }).catch(error => {
    res.send(error);
  })
})

app.get('/stockIndices', (req, res) => {
  getStockIndices().then(response => {
    const processed = processStockIndices(response);
    res.send(processed);
  }).catch(error => {
    console.log(error);
  })
})

async function getStockIndices() {
  try {
    const url = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=spy,dia,iwm&types=quote&range=1m&last=5&token=${process.env.IEX_PUBLIC_KEY}`
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error)
  }
}


function processStockIndices(indices) {
  const processedIndices = [];

  for (const symbol in indices) {
    const processedIndex = {};

    processedIndex.symbol = symbol;
    processedIndex.latestPrice = indices[symbol]["quote"]["latestPrice"];
    processedIndex.changePercent = indices[symbol]["quote"]["changePercent"] * 100;

    processedIndices.push(processedIndex);
  }

  return processedIndices;
}

// listen on the port
// http://localhost:8000
app.listen(port)