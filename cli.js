#!/usr/bin/env node
'use strict';

require('dotenv').load();
const meow = require('meow');
const request = require('request');

let cli = meow(`
  Usage
    $ weather <city name>

	Example
	  $ weather Boulder,CO

      Boulder:
        scattered clouds
        296.69° K
        25 % humidity
`);

if (cli.input[0] === undefined) {
  console.log(`
    Usage:
      $ weather <city name>

    Help:
      $ weather --help
  `);
  process.exit(1);
}

let options = {
  url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cli.input[0],
  headers: {
    'x-api-key': process.env.API_KEY
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    body = JSON.parse(body);

    let description = body.weather[0].description;
    let temp = (body.main.temp * (9/5) - 459.67).toFixed(2);
    let humidity = body.main.humidity;

    console.log( `
  ${body.name}:
    ${description}
    ${temp} ° F
    ${humidity} % humidity
    `);
  } else if (response.statusCode == 401){
    console.log('Error: No API key provided.');
  } else {
    console.log('Failed with status code of ' + response.statusCode);
  }
});
