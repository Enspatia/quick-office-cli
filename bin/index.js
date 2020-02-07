#!/usr/bin/env node

require('@babel/register');

const subCommands = require('../lib/commands');// print menu

const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1')
  .usage('<command> [options]')
  .option('-v, --version', 'Show the version of the app')
  .option('-h, --help', 'Show help screen');

let mc =  subCommands["make-controller"];

program.command("make-controller") // sub-command name
  .description('Create a controller code stub') // command description
  .alias("mc")
  .option('-n,--name <name>', 'Name of the controller (lower caps)')
  .action(function (name) {
    mc.handler(name)
  });

if (program.help) {
  subCommands.help.handler();
}

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('');
  console.log('Examples:');
  console.log(' $ custom-help --help');
  console.log(' $ custom-help -h');
  subCommands.help.handler();
});

let init = () => {
  subCommands.help.handler();
};

// allow commander to parse `process.argv`
program.parse(process.argv);
