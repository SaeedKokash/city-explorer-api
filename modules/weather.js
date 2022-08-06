const axios = require('axios');

const weatherCache = {};

async function handleWeather(req, res) {
  let searchQuery = req.query.searchQuery;
  let lat = req.query.lat;
  let lon = req.query.lon;

  if (weatherCache[searchQuery] !== undefined) {

    res.status(200).send(weatherCache[searchQuery]);

  } else {
    const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);

    try {
      const cityData = cityArr.data.data.map(item => new Forecast(item));
      weatherCache[searchQuery] = cityData;
      res.status(200).send(cityData);
    } catch (error) {
      errorHandler(error, res);
    }

  }
}


//new object class
class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

module.exports = { handleWeather };
