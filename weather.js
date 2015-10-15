'use strict';

const request = require('request');
const d2d = require('degrees-to-direction');

function getWeather(location, cb) {
  let options = {
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial',
    headers: {
      'x-api-key': process.env.API_KEY
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      return cb(body);
    } else if (response.statusCode === 401){
      console.log('Error: No API key provided.');
    } else {
      console.log('Failed with status code of ' + response.statusCode);
    }
  });
}

function current(location) {
  getWeather(location, function(data) {
    console.log(
      `\n${data.name}:\n`,
      `  ${data.weather[0].description}\n`,
      `  ${data.main.temp} ° F\n`,
      `  ${data.main.humidity} % humidity\n`
    );
  });
}

function all(location) {
  getWeather(location, function(data) {
    console.log(
      `\n${data.name}:\n`,
      `  ${data.weather[0].description}\n\n`,
      `  Avg. Temp: ${data.main.temp}° F\n`,
      `  Min. Temp: ${data.main.temp_min}° F\n`,
      `  Max. Temp: ${data.main.temp_max}° F\n`,
      `  Humidity:  ${data.main.humidity}%\n`,
      `  Pressure:  ${data.main.pressure} mb\n`,
      `  Wind:      ${data.wind.speed} mph from ${d2d(data.wind.deg)}\n`
    );
  });
}

module.exports = {
  current,
  all
};
