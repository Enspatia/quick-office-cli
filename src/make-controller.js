const path = require('path');
const painter = require('../lib/painter');
const chalk = require('chalk');
const Progress = require('progress');
const pascal = require('pascalcase');
const commander = require('../lib/commander');

let colors = painter.colors;

module.exports = (command) => {
  const name = command.name;
  if (name) {
    console.log(process.cwd());
    const modelName = pascal(name);
    const directory = path.join(process.cwd(), `/src/controllers/`);
    /* commander(`cd ${path.join(__dirname, 'src/controllers')}`)
      .catch(err => console.log(err));
    ;*/
    painter.verticalSpace();
    const progress = new Progress(':current', { total : 8 });
    const startTime = +new Date();
    progress.tick(); // msg 1
    console.log(chalk.hex(colors.lightGreen)(` Creating ${chalk.bold(name)} directory...`));

    commander(`mkdir ${directory}/${name}`)
      .then(() => {
        progress.tick() // msg 2
        console.log(chalk.hex(colors.lightGreen)(` Creating controller file...`));
      })
      .then(() => {
        commander(`touch ${directory}/${name}/${name}.controller.js`)
          .then(() => {
            progress.tick(); // msg 3
            console.log(chalk.hex(colors.lightGreen)(` Adding controller code stubs...`));
            // region boilerplate
            const boilerplate = `import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import { ${modelName} } from '../../models';
import { successResponse, errorResponse, uniqueId, sendMail } from '../../helpers';

export const all = async (req, res) => {};

export const one = async (req, res) => {};

export const create = async (req, res) => {};

export const update = async (req, res) => {};

export const remove = async (req, res) => {
  try {
    let ${name} = await ${modelName}.findOne({ where: { id: req.body.id } });

    if (!${name}) {
      return errorResponse(req, res, '${modelName} with ID : ' + req.body.id + ' NOT FOUND!', 404,);
    }

    ${name} = await ${modelName}.destroy({ where: { id: ${name}.id } });
    return successResponse(req, res, ${name});
  } catch (error) {
    return errorResponse(req, res, error.message, 404);
  }
};`;
            // endregion
            commander(`echo "${boilerplate}" > ${directory}/${name}/${name}.controller.js`)
              .then(() => {
                progress.tick(); // msg 4
                console.log(chalk.hex(colors.lightGreen)(` Creating test spec...`));
              }).catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .then(() => {
        commander(`touch ${directory}/${name}/${name}.spec.js`)
          .then(() => {
            progress.tick(); // msg 5
            console.log(chalk.hex(colors.lightGreen)(` Creating validator...`));
          })
          .catch(e => console.log(e));
      })
      .then(() => {
        commander(`touch ${directory}/${name}/${name}.validator.js`)
          .then(() => {
            progress.tick(); // msg 6
            console.log(chalk.hex(colors.lightGreen)(` Adding validator code stubs...`));
            const boilerplate = ` const Joi = require('joi');`;
            commander(`echo "${boilerplate}" > ${directory}/${name}/${name}.validator.js`)
              .then(() => {
                progress.tick(); // msg 7
                console.log(chalk.hex(colors.lightGreen)(` Done in ${+new Date() - startTime}ms`));
              }).catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .catch((e) => {
        console.log(e);
        console.log(chalk.redBright(`A directory ${chalk.bold(name)} already exists in the controllers directory`));
      });
  } else {
    // make-controller --name=ama
    console.log(`Required parameter, ${chalk.bold.greenBright('--name')} is missing`);
    __interface.prompt();
  }
};
