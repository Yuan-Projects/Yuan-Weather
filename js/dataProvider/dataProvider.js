let config = require('../../config.js');
let API = null;

switch (config.vendor) {
  case 'heweather':
    API = require("./heweather.js");
    break;
}

module.exports = API;