#!/usr/bin/env node --harmony

'use strict';

const path = require('path');
const configUtil = require('./config');
const cwd = process.cwd();
const quailCore = require(path.join(cwd, 'node_modules', '@quailjs/quail-core'));

module.exports = function quailBuild () {
  // Get a list of assessments.
  configUtil.getLocalConfig(function (data) {
    quailCore.build(data);
  });
};
