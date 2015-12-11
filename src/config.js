'use strict';

const fs = require('fs');
const path = require('path');

let cwd = process.cwd();

let getLocalConfig = (callback) => {
  let configFilePath = path.join(cwd, '.quailrc');
  fs.readFile(configFilePath, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
    callback(JSON.parse(data));
  });
}

// Get the config file.

module.exports = {
  getLocalConfig: getLocalConfig
}
