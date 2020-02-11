const path = require('path');
const painter = require('../lib/painter');
const chalk = require('chalk');
const pascal = require('pascalcase');
const commander = require('../lib/commander').sh;
const print = require('../lib/commander').print;
const { readFile, fileExits } = require('../lib/utils');

let colors = painter.colors,
    bold   = chalk.bold;

module.exports = (command) => {
  const name = command.name;
  if (name) {
    const modelName = pascal(name);
    const directory = path.join(process.cwd(), `/src/routes/`);

    let baseControllersDir = path.join(__dirname, '../lib/boilerplate/');

    if (!fileExits(`${directory}${name}.js)`)) {
      let boilerplate = readFile(baseControllersDir + 'route-table.js')
        .replace(/\${name}/gi, name)
        .replace(/\${modelName}/gi, modelName)
        .trim();

      painter.verticalSpace();
      const startTime = +new Date();
      console.log(bold.hex(colors.yGreen)('[1/2]'),
        chalk.hex(colors.lightGreen)(`Creating ${chalk.bold(name)} route table file...`));

      Promise.all([
        commander(`touch ${directory}${name}.js`),
        print(bold.hex(colors.yGreen)('[2/2]'), chalk.hex(colors.lightGreen)(`Adding route table code stubs...`)),

        commander(`echo "${boilerplate}" > ${directory}${name}.js`),

        print(chalk.hex(colors.lightGreen).bold(`Finished setting up route table`))
      ])
        .then(() => {
          console.log(chalk.hex(colors.lightGreen).bold(`Done in ${+new Date() - startTime}ms`));
        })
        .catch((e) => {
          console.log(chalk.redBright(`A file ${chalk.bold(name)} may already exists in the controllers directory`));
          console.log(e);
        });
    } else {
      console.log(`A route table file with name ${chalk.bold.greenBright(name)} already exists`);
      __interface.prompt();
    }
  } else {
    console.log(`Required parameter, ${chalk.bold.greenBright('--name')} is missing`);
    __interface.prompt();
  }
};
