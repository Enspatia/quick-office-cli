const commands = require('../lib/commands');
let painter = require('../lib/painter');
let chalk = require('chalk');

module.exports = () => {
  let stringBuffer = '';
        Object.keys(commands)
    .forEach((command) => {
      let lineBuffer = chalk.yellowBright.bold(command);
      const padding = 40 - lineBuffer.length;
      const descriptionLines = commands[command].description.split('\n');
      lineBuffer += painter.pad(padding) + chalk.greenBright(descriptionLines[0]);

      //console.log(lineBuffer);
      stringBuffer += lineBuffer + '\n';
      for (let i = 1, len = descriptionLines.length; i < len; i++) {
        lineBuffer = painter.pad(22) + chalk.greenBright(descriptionLines[i]);
        stringBuffer += lineBuffer + '\n';
        //console.log(lineBuffer);
      }
    });
  return stringBuffer;
};
