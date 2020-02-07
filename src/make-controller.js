const path = require('path');
const painter = require('../lib/painter');
const chalk = require('chalk');
const Progress = require('progress');
const pascal = require('pascalcase');
const commander = require('../lib/commander').sh;
const print = require('../lib/commander').print;
const readFile = require('../lib/utils').readFile;

let colors = painter.colors,
    bold   = chalk.bold;

let bpsDir = path.join(__dirname, '../lib/boilerplate/');

let boilerplate = {
  controller      : readFile(bpsDir + 'controller.js'),
  controllerTests : readFile(bpsDir + 'controller-spec.js'),
  routesTests     : readFile(bpsDir + 'routes-spec.js'),
  validator       : readFile(bpsDir + 'validator.js')
};

/**
 *
 * @param str {String}
 * @param searchStr
 * @param replacement
 * @return {*|void|string}
 */
function replace(str, searchStr, replacement) {
  return str.replace(new RegExp(arguments[0], 'gi'), arguments[0]);
}

/**
 *
 * @param str
 * @param vargs
 * @return {*|void|string}
 */
function replaceAll(str, vargs) {
}


module.exports = (command) => {
  const name = command.name;
  if (name) {
    const modelName = pascal(name);
    const directory = path.join(process.cwd(), `/src/controllers/`);
    /* commander(`cd ${path.join(__dirname, 'src/controllers')}`)
      .catch(err => console.log(err));
    ;*/
    painter.verticalSpace();
    const startTime = +new Date();
    // msg 1
    console.log(bold.hex(colors.yGreen)('[1/9]'), chalk.hex(colors.lightGreen)(`Creating ${chalk.bold(name)} directory...`));

    Promise.all([
      commander(`mkdir ${directory}/${name}`),
      print(bold.hex(colors.yGreen)('[2/9]'), chalk.hex(colors.lightGreen)(`Creating controller file...`)),

      commander(`touch ${directory}/${name}/${name}.controller.js`),
      print(bold.hex(colors.yGreen)('[3/9]'), chalk.hex(colors.lightGreen)(`Adding controller code stubs...`)),

      commander(`echo "${boilerplate.controller.replace(/\${name}/gi, name).replace(/\${modelName}/gi, modelName)}" > ${directory}/${name}/${name}.controller.js`),
      print(bold.hex(colors.yGreen)('[4/9]'), chalk.hex(colors.lightGreen)(`Creating test spec...`)),

      commander(`touch ${directory}/${name}/${name}.spec.js`),
      print(bold.hex(colors.yGreen)('[5/9]'), chalk.hex(colors.lightGreen)(`Adding controller spec code...`)),

      commander(`echo "${boilerplate.controllerTests.replace(/\${name}/gi, name).replace(/\${modelName}/gi, modelName)}" > ${directory}/${name}/${name}.spec.js`),
      print(bold.hex(colors.yGreen)('[6/9]'), chalk.hex(colors.lightGreen)(`Creating routes spec...`)),

      commander(`touch ${directory}/${name}/${name}.routes.spec.js`),
      print(bold.hex(colors.yGreen)('[7/9]'), chalk.hex(colors.lightGreen)(`Adding routes spec code...`)),

      commander(`echo "${boilerplate.routesTests.replace(/\${name}/gi, name).replace(/\${modelName}/gi, modelName)}" > ${directory}/${name}/${name}.routes.spec.js`),
      print(bold.hex(colors.yGreen)('[8/9]'), chalk.hex(colors.lightGreen)(`Creating validator...`)),

      commander(`touch ${directory}/${name}/${name}.validator.js`),
      print(bold.hex(colors.yGreen)('[9/9]'), chalk.hex(colors.lightGreen)(`Adding validator code stubs...`)),

      commander(`echo "${boilerplate.validator}" > ${directory}/${name}/${name}.validator.js`),
      print(chalk.hex(colors.lightGreen).bold(`Finished setting up controller`))
    ])
      .then(() => {
        console.log(chalk.hex(colors.lightGreen).bold(`Done in ${+new Date() - startTime}ms`));
      })
      .catch((e) => {
        console.log(chalk.redBright(`A directory ${chalk.bold(name)} may already exists in the controllers directory`));
        console.log(e);
      });
  } else {
    console.log(`Required parameter, ${chalk.bold.greenBright('--name')} is missing`);
    __interface.prompt();
  }
};
