# node-js-getting-started

This web app is using [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/Yuan-Projects/Yuan-Weather.git # or clone your own fork
$ cd Yuan-Weather/server
$ npm install && npm run build
```

Open `package.json` with your favorite code editor, edit the `start` script value:

```json
"scripts": {
  "start": "set WEATHER_API_APP_KEY=<YOUR_VISUALCROSSING_WEATHER_KEY> && node index.js"
}
```

This application is using [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api), you need to obtain your key first, and replace `<YOUR_VISUALCROSSING_WEATHER_KEY>` with your own key.

**Note**: You should only do this when developing and testing on your local machine. Do NOT commit it to Git or any other source control tools. When deploying to a production machine, you should set this environment variable on the service side.

Then run the following command in terminal:

```sh
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

