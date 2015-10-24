# weather-terminal

Weather from the command line. :sunny:


### Setup
```sh
# Install
$ npm install --global weather-terminal

# Update
$ npm update --global weather-terminal
```

You will need an API key from Open Weather. Follow the [directions](http://openweathermap.org/appid) to get a key.

Once you have a key use `--add-key` flag to add the key to `weather-terminal`. The key only needs to be added once and it will be remembered for future requests.

```sh
$ weather 123456789 --add-key
```

You can optionally add a default location to use that will be saved for future requests.

```sh
$ weather Boulder,CO --set-default
$ weather

Boulder:
  scattered clouds
  74.37 ° F
  25 % humidity
```

### Usage
```sh
$ weather Boulder,CO

Boulder:
  scattered clouds
  74.37 ° F
  25 % humidity

$ weather --help
```

### License
MIT
