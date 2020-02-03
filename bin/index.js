#!/usr/bin/env node

require('@babel/register');

const subCommands = require('../lib/commands');// print menu

//const app = require('commander');// import function to list coffeee menu
//app.version('0.0.1');

const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1')
  .option('-v, --version', 'Show the version of the app')
  .option('-h, --help', 'Show help screen');
//help();

Object.keys(subCommands).forEach((subCommand) => {
  //console.log(subCommands[subCommand]);
  /*let requiredParams = '';
  let optionalParams = '';
  if (subCommands[subCommand].params) {
    if (subCommands[subCommand].params.required) {
      requiredParams = subCommands[subCommand].params.required
        .reduce(function (acc, curr, i) {
          return acc + ' <' + curr + '>';
        }, ' ');
    }
    if (subCommands[subCommand].params.optional) {
      optionalParams = subCommands[subCommand].params.optional
        .reduce(function (acc, curr, i) {
          return acc + ' [' + curr + ']';
        }, ' ');
    }
  }*/
  let command = program.command(subCommand) // sub-command name
    .alias(subCommands[subCommand].alias)
    .description(subCommands[subCommand].description);

  if (subCommands[subCommand].params) {
    if (subCommands[subCommand].params.required) {
      subCommands[subCommand].params.required.forEach((param) => {
        command.option(`${ param.alias ? '-' + param.alias + ',' : ''}--${param.name} <${param.name}>`, param.description || '');
      })
    }
  }
  command.action(function (name) {
    subCommands[subCommand]['handler'](name)
  });

  /*if (subCommands[subCommand].description) {
    command.description(subCommands[subCommand].description) // command description
  }

  if (subCommands[subCommand].alias) {
    command.alias(subCommands[subCommand].alias) // alternative sub-command is `al`
  }*/
});

//program.command("make-controller") // sub-command name
//  .description('Create a controller code stub') // command description
//  .alias("mc")
//  .action(function () {
//    subCommands["make-controller"].handler()
//  });

if (program.help) {
  subCommands.help.handler();
}

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
  subCommands.help.handler();
});

let init = () => {

};

// allow commander to parse `process.argv`
program.parse(process.argv);
