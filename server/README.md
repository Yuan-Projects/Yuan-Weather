# node-js-getting-started

This web app is using [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/Yuan-Projects/Yuan-Weather.git # or clone your own fork
$ cd Yuan-Weather/server
$ npm install && npm run build
```

Add two environment variables to your local machine and/or production machine.

```bash
## Unix
set WEATHER_API_APP_KEY=<YOUR_VISUALCROSSING_WEATHER_KEY>
set AQI_API_KEY=<YOUR_AQICN_API_KEY>

## Or Windows Powershell:
$env:WEATHER_API_APP_KEY="<YOUR_VISUALCROSSING_WEATHER_KEY>"
$env:AQI_API_KEY="<YOUR_AQICN_API_KEY>"

## Or CMD:
$env:WEATHER_API_APP_KEY=<YOUR_VISUALCROSSING_WEATHER_KEY>
$env:AQI_API_KEY=<YOUR_AQICN_API_KEY>
```

This application is using [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) and [aqicn.org API](https://aqicn.org/api/), you need to obtain your keys first, and replace `<YOUR_VISUALCROSSING_WEATHER_KEY>` and `<YOUR_AQICN_API_KEY>` with your own keys.

**Note**: You should only do this when developing and testing on your local machine. Do NOT commit it to Git or any other source control tools. When deploying to a production machine, you should set this environment variable on the service side.

Then run the following command in terminal:

```sh
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).
