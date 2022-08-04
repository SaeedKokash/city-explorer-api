'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;


//just to make sure that the server works in home
// app.get('/', (req, res) => {
//   res.send('Hello this is first app.get now');
// });

// declaring json data from location
// const weatherData = require('./data/weather.json');


const { handleWeather } = require('./modules/weather');
const { handleMovie } = require('./modules/movie');

app.get('/weather', handleWeather);
app.get('/movies', handleMovie);


//for anything that doesnt exist in code
app.get('*', (req, res) => { res.status(404).send('Page not found!'); });


//function to send an error if found it will be deployed in the catch
function errorHandler(error, res) {
  res.status(500).send({ error: 'Something went wrong' });
}

app.listen(port, () => {
  console.log(`Server is starting at port ${port}`);
});

