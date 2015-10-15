#!/usr/bin/env node
'use strict';

require('dotenv').load({ silent: true });
const meow = require('meow');
const weather = require('./weather');
const fs = require('fs');

function showHelp() {
  console.log(
    `Usage:\n`,
    `  weather <city name>\n\n`,
    `Help:\n`,
    `  weather --help`
  );
  process.exit(1);
}

let cli = meow(`
  Usage
    To add an API key:
    $ weather <api key> --add-key

    To get the weather:
    $ weather <city name> <options>

  Options
    --version  Current version
    --help     Show this message
    --add-key  Add an API key
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
  showHelp();
}

if (cli.flags.addKey === true) {
  fs.writeFile('./.env', `API_KEY=${cli.input[0]}`, function() {
    console.log('Saved key.');
    process.exit(0);
  });
}

if (cli.flags.all === true) {
  weather.all(cli.input[0]);
} else if (cli.flags.length === undefined) {
  weather.current(cli.input[0]);
} else {
  showHelp();
}
