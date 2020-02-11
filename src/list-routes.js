const path = require('path');
const painter = require('../lib/painter');
const chalk = require('chalk');
const Progress = require('progress');
const pascal = require('pascalcase');
const commander = require('../lib/commander').sh;
const print = require('../lib/commander').print;
const readFile = require('../lib/utils').readFile;

module.exports = function () {
  commander("")
};
