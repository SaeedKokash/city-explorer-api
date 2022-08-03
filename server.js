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

// using a statip json file for weather data
app.get('/weather', async (req, res) => {
  let searchQuery = req.query.searchQuery;
  let lat = req.query.lat;
  let lon = req.query.lon;

  const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);

  try {

    const cityData = cityArr.data.data.map(item => new Forecast(item));
    res.status(200).send(cityData);

  } catch (error) {

    errorHandler(error, res);
  }

});

app.get('/movies', async (req, res) => {
  const searchQuery = req.query.searchQuery;

  const movieArr = await axios.get(`http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);

  try {

    const movieData = movieArr.data.results.map(item => new Movie(item));
    res.status(200).send(movieData);

  } catch (error) {
    errorHandler(error, res);
  }
});


//for anything that doesnt exist in code
app.get('*', (req, res) => { res.status(404).send('Page not found!') });


//function to send an error if found it will be deployed in the catch 
function errorHandler(error, res) {
  res.status(500).send({ error: 'Something went wrong' });
}



//new object class
class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}


class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

app.listen(port, () => {
  console.log(`Server is starting at port ${port}`);
});

