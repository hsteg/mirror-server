const GreenpointAve = require('./greenpointAve');
const BusTime = require('./bus')

class BusAndTrain {
  constructor() {
    this.b62 = new BusTime('305170'),
    this.greenpointAve = new GreenpointAve()
  }

  async getTransit() {
    let [bus, train] = await Promise.all(
      [this.b62.getBusTime('led'), this.greenpointAve.getTransit('led')]
    )

    return {
      train: train,
      bus: bus
    };
  }
}

module.exports = BusAndTrain;