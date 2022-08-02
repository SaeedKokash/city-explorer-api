'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

//just to make sure that the server works in home
app.get('/', (req, res) => {
  res.send('Hello this is first app.get now');
});

// declaring json data from location
const weatherData = require('./data/weather.json');

//using a statip json file for weather data
// app.get('/weather', (req, res) => {
//   res.send(weatherData);
// });


app.get('/weather', (req, res) => {
  let searchQuery = req.query.searchQuery;

  try {

    const city = weatherData.find(value => value.city_name.toLowerCase() === searchQuery.toLowerCase());
    const weatherArr = city.data.map(item => new Forecast(item));
    res.status(200).send(weatherArr);

  } catch (err) {

    handleError(err, res);
    // this could work also without function
    // res.status(500).send('Something went wrong')
  }

});

app.get('*', (req, res) => {res.status(404).send('page not found!')});


//function to pass to api
function handleError(error, res) {
  res.status(500).send('Something went wrong');
}


//new object class
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}


app.listen(port, () => {
  console.log(`Server is starting at port ${port}`);
});
