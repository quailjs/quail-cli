#!/usr/bin/env node --harmony

'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');
const cwd = process.cwd();
const quailCore = require(path.join(cwd, 'node_modules', '@quailjs/quail-core'));
const state = {};

module.exports = function quailBuild(cmd) {
  // Get a list of assessments.
  config.getLocalConfig(function (data) {
    state.jquery = data.jquery;
    state.quail = data.quail;
    state.assessmentSpecsPath = data.assessmentSpecsPath;
    quailCore.build();
  });
};
