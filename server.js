require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3002;
const weatherData = require('./data/weather.json');
const { request } = require('express');

app.use(cors())

app.get('/test', (request, response) => {
  response.send('You made the connection')
});

app.get('/weather', (request, response, next) => {
  try {
    const searchQuery = request.query.city_name;
    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=US&key=${process.env.WEATHER_API_KEY}&units=I&days=7`);
    let cityWeather= await axios.get(url);
    const weatherArray = [];
    // console.log(searchQuery, 'This is the search query');
    // const cityWeatherData = weatherData.find(city => city.city_name === searchQuery);
    // console.log(cityWeatherData, 'This is city weather data');
    cityWeatherData.data.forEach(day => {
      let forecast = new Forecast(day);
      weatherArray.push(forecast)
    });
    response.send(weatherArray)
  } catch (error) {
    next(error);
    // response.status(500).send(error, 'Weather route error')
  }
});

app.get('*', (request,response) => {
response.send ('You know you aint getting anything, right?');
});
app.use((error,request,response,next) => {
  if(error){
    response.status(500).send(error.message);
  }else {
    next(error);
  }
});

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;

  }
}




app.listen(PORT, () => console.log('listening on ${PORT}'))
