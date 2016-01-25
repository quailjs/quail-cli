#!/usr/bin/env node --harmony
'use strict';

const path = require('path');
const spawn = require('child_process').spawn;

/**
 *
 */
module.exports = function quailEvaluate (url, cmd) {
  // Change to the dist dir.
  let cwd = process.cwd();

  var runnerScript;
  var phantomjsExec = path.join(cwd, 'node_modules/phantomjs/bin/phantomjs');
  var runners = {
    'default': path.join(__dirname, 'evaluators/phantom_evaluator.js'),
    wcag2: path.join(__dirname, 'evaluators/wcag2_evaluator.js')
  };

  if (cmd.runner in runners) {
    runnerScript = runners[cmd.runner];
  }
  else {
    runnerScript = runners['default'];
  }

  var args = [phantomjsExec, runnerScript, url, cwd];
  // Determine the configuration file path.
  var configFilePath = path.join(__dirname, '..', '.phantomrc');
  if (cmd.config) {
    configFilePath = cmd.config;
  }
  args.push(configFilePath);
  // cmd.output, if undefined, will be passed as the string 'undefined', so only
  // include it if it has a value.
  if (cmd.output) {
    args.push(cmd.output);
  }
  var proc = spawn('node', args, {
    stdio: 'inherit'
  });
  proc.on('exit', function (code, signal) {
    process.on('exit', function () {
      if (signal) {
        process.kill(process.pid, signal);
      }
      else {
        process.exit(code);
      }
    });
  });
};
