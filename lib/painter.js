/* eslint-disable no-console, no-plusplus, no-param-reassign*/
const chalk = require('chalk');

const painter = {};

painter.colors = {
  lightGreen : '#5cff2e',
  orange     : '#ff9b0e',
  lightBlue  : '#3cb3ff',
  purple     : '#9c21ff'
};

painter.chalk = chalk;
// caching the screenWidth for faster access
painter.screenWidth = process.stdout.columns;

painter.verticalSpace = (lines = 1) => {
  for (let i = 0; i < lines; i++) {
    console.log('');
  }
};

painter.horizontalLine = () => {
  let line = '';
  for (let i = 0; i < painter.screenWidth; i++) {
    line += '-';
  }
  console.log(line);
};

painter.centered = (str) => {
  str = typeof str==='string' && str.trim().length > 0 ? str.trim():'';

  const leftPadding = Math.floor((painter.screenWidth - str.length) / 2);

  let line = '';
  for (let i = 0; i < leftPadding; i++) {
    line += ' ';
  }
  line += str;
  console.log(line);
};

painter.pad = (padding) => {
  let padStringBuffer = '';
  for (let i = 0; i < padding; i++) {
    padStringBuffer += ' ';
  }
  return padStringBuffer;
};

module.exports = painter;
