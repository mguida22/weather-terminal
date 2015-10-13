#!/usr/bin/env node
'use strict';

require('dotenv').load();
const meow = require('meow');
const request = require('request');
const d2d = require('degrees-to-direction');

let cli = meow(`
  Usage
    $ weather <city name>

  Options
    --version  Current version
    --help     Show this message
    -a, --all  Show all data

	Example
	  $ weather Boulder,CO

  Boulder:
    scattered clouds
    69.55 ° F
    15 % humidity
`, {
  alias: {
    a: 'all'
  }
});

if (cli.input[0] === undefined) {
  console.log(
    `Usage:\n`,
    `  weather <city name>\n\n`,
    `Help:\n`,
    `  weather --help`
  );
  process.exit(1);
}

let options = {
  url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cli.input[0] + '&units=imperial',
  headers: {
    'x-api-key': process.env.API_KEY
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    body = JSON.parse(body);

    let description = body.weather[0].description;
    let temp = body.main.temp;
    let humidity = body.main.humidity;

    console.log(
      `${body.name}:\n`,
      `  ${description}\n`,
      `  ${temp} ° F\n`,
      `  ${humidity} % humidity`
    );

    if (cli.flags.all === true) {
      //console.log(JSON.stringify(body));
      console.log(
        `\n`,
        `  min. temp: ${body.main.temp_min}\n`,
        `  max. temp: ${body.main.temp_max}\n`,
        `  wind speed: ${body.wind.speed} mph from ${d2d(body.wind.deg)}`
      );
    }
  } else if (response.statusCode == 401){
    console.log('Error: No API key provided.');
  } else {
    console.log('Failed with status code of ' + response.statusCode);
  }
});
