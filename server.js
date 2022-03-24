require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3002;
const weatherData = require('./data/weather.json');

app.use(cors())

app.get('/test', (request, response) => {
  response.send('You made the connection')
});

app.get('/weather', (request, response) => {
  try {
    const searchQuery = request.query.searchQuery;
    console.log(searchQuery,'This is the search query');
    const cityWeatherData = weatherData.find(city => city.city_name === searchQuery);
    console.log(cityWeatherData, 'This is city weather data');
    const weatherArray = [];
    cityWeatherData.data.forEach(day => {
      const forecast = new Forecast(day);
        weatherArray.push(forecast)
    });
    response.send(weatherArray)
  } catch (error) {
    response.status(500).send(error, 'Weather route error')
  }
});

class Forecast {
  constructor(weather) {
    this.date = weather.datetime;
    this.description = weather.description;
    this.cityName = weather.city_name; 
  }
}




app.listen(PORT, () => console.log('listening on ${PORT}'))
