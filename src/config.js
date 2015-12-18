const fs = require('fs');
const path = require('path');

var cwd = process.cwd();

var getLocalConfig = (callback) => {
  var configFilePath = path.join(cwd, '.quailrc');
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
