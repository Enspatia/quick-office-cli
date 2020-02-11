#!/usr/bin/env node

require('@babel/register');

const subCommands = require('../lib/commands');// print menu

const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1')
  .alias("qo")
  .usage('<command> [options]')
  .option('-v, --version', 'Show the version of the app')
  .option('-h, --help', 'Show help screen');

let mc =  subCommands["make-controller"];

program.command("make-controller") // sub-command name
  .description('Create a directory for a new controller with associated boilerplate code') // command description
  .alias("mc")
  .option('-n, --name <name>', 'Name of the controller (lower caps)')
  .action(function (name) {
    mc.handler(name)
  });

let cr = subCommands['create-route'];

program.command("create-route") // sub-command name
  .description('Create a route table file in /src/routes with code stubs') // command description
  .alias("cr")
  .option('-n, --name <name>', 'Name of the route table (lower caps)')
  .action(function (name) {
    cr.handler(name)
  });

program.command('list-routes')
  .description('List all mounted routes when app is running')
  .alias('ls')
  .action(() => {
  });

if (program.help) {
  subCommands.help.handler();
}

// must be before .parse() since
// node's emit() is immediate

//program.help(function () {
  //return subCommands.help.handler();
//});

program.on('--help', function(){
  console.log('');
  console.log('Examples:');
  console.log(' $ custom-help --help');
  console.log(' $ custom-help -h');
  // subCommands.help.handler();
});

let init = () => {
  subCommands.help.handler();
};

// allow commander to parse `process.argv`
program.parse(process.argv);
