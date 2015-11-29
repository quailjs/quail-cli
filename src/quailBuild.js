#!/usr/bin/env node --harmony

'use strict';

const path = require('path');
const configUtil = require('./config');
const cwd = process.cwd();

module.exports = function quailBuild () {
  const quailCore = require(
    path.join(cwd, 'node_modules', '@quailjs/quail-core')
  );
  // Get a list of assessments.
  configUtil.getLocalConfig(function (data) {
    quailCore.build(data);
  });
};
