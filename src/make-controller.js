const path = require('path');
const painter = require('../lib/painter');
const chalk = require('chalk');
const Progress = require('progress');
const pascal = require('pascalcase');
const commander = require('../lib/commander');

let colors = painter.colors;

let boilerplate = {
  // region controller
  controller      : (name, modelName) => `import jwt from 'jsonwebtoken';
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
};`,
// endregion
  // region controllerTests
  controllerTests : (name, modelName) => `import MockExpressResponse from 'mock-express-response';
import { getAll, getOne, update, delete, } from './${name}.controller';

import { successResponse } from '../../helpers';

import { ${modelName} } from '../../models';
// mock success and error function mock
jest.mock('./../../helpers');

describe('${modelName} model', () => {
  it('should return a ${name} model', () => {
    expect(${modelName}).toBeTruthy();
  });

  console.log(${modelName});
  it('should have an id property', function () {
    expect(${modelName}.id).toBeUndefined();
  });
});

// express response object for (req, res) function
const res = new MockExpressResponse();

describe('${modelName} controller', () => {
  test('getAll', async () => {
    // mock database functions that we are using inside functions
    // so we don't have to be dependant on database
    // resolve data that you want return from database in Promise.resolve
    const spyUserFindAndCountAll = jest
      .spyOn(${modelName}, 'findAndCountAll')
      .mockImplementation(() =>  Promise.resolve([]));

    // create request object and put value that you required to check in function
    const req = {
      params: {
        page: 1,
      },
    };

    // call function
    await getAll(req, res);
    expect(res.statusCode).toEqual(200);
    
    // check database function is calling or not
    expect(spyUserFindAndCountAll).toBeCalled();
    
    // check response is correct or not
    expect(successResponse)
      .toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
      );
    
    // restore database/model function that we have mocked
    spyUserFindAndCountAll.mockRestore();
  });

  test('getOne', async () => {
    // mock database functions that we are using inside functions
    // so we don't have to be dependant on database
    // resolve data that you want return from database in Promise.resolve
    const spyGetOne = jest
      .spyOn(${modelName}, 'findOne')
      .mockImplementation(() => Promise.resolve({}));

    // create request object and put value that you required to check in function
    const req = {
      user: {
      },
    };

    // call function
    await profile(req, res);

    // check database function is calling or not
    expect(spyGetOne).toBeCalled();

    // check response is correct or not
    expect(successResponse)
      .toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
      );
    // restore database/model function that we have mocked
    spyGetOne.mockRestore();
  });

  test('create', () => {
    // mock database functions that we are using inside functions
    // so we don't have to be dependant on database
    // resolve data that you want return from database in Promise.resolve
    const spyCreate = jest
      .spyOn(${modelName}, 'create')
      .mockImplementation(() => Promise.resolve({}));
      
    const req = {
      user: {
      },
    };
    
    // call function
    await create(req, res);
    
    // check database function is calling or not
    expect(spyCreate).toBeCalled();
  })
  
  test('update', () => {
    // mock database functions that we are using inside functions
    // so we don't have to be dependant on database
    // resolve data that you want return from database in Promise.resolve
    const spyUpdate = jest
      .spyOn(${modelName}, 'update')
      .mockImplementation(() => Promise.resolve({}));
      
    const req = {
      user: {
      },
    }; 
    
    // call function
    await update(req, res); 
    
    // check database function is calling or not
    expect(spyUpdate).toBeCalled();
  })
  
  test('delete', () => {
    // mock database functions that we are using inside functions
    // so we don't have to be dependant on database
    // resolve data that you want return from database in Promise.resolve
    const spyDelete = jest
      .spyOn(${modelName}, 'destroy')
      .mockImplementation(() => Promise.resolve({}));
      
    const req = {
      user: {
      },
    };
    
    // call function
    await delete(req, res); 
    
    // check database function is calling or not
    expect(spyDelete).toBeCalled(); 
  })
});
`,
  // endregion
  // region routesTests
  routesTests     : (name, modelName) => {
    return `import request from 'supertest';
import app from '../../../app';

/*
 declare the token variable in a scope accessible by the entire test suite
*/
let token;

beforeAll(async (done) => {
  await request(app)
    .post('/public/login')
    .set('Accept', 'application/json')
    .send({
      email   : 'georgeranch71@gmail.com',
      password: 'letmepass'
    })
    .then((res, err) => {
      if (err) console.log(err);

      token = res.body.data.token; // save the token!
      done();
    });
});

describe('${modelName} Endpoints', () => {
  it('loads correctly', () => {
    request(app).get('/').expect(200);
  });

  it('should create a new ${name}', () => {
    request(app)
      .post('/api/${name}s')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .set('x-token', token)
      .send({
        // sth
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.${name} = {};
        res.body.message = 'success';
      })
      .expect(200, {
        ${name}   : {},
        message: 'success'
      });
  });

  it('should fetch a single ${name}', async () => {
    const res = await request(app)
      .get('/api/${name}s/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .set('x-token', token);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
  });

  it('should fetch all ${name}s', async () => {
    const res = await request(app)
      .get('/api/${name}s')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .set('x-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('${name}s');
  });

  it('should update a ${name}', async () => {
    const res = await request(app)
      .put('/api/${name}s/4')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .set('x-token', token)
      .send({
        // sth
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data.user).toHaveProperty('dob');
  });

  it('should delete a ${name}', async () => {
    const res = await request(app)
      .delete('/api/${name}s/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .set('x-token', token);
    expect(res.statusCode).toEqual(200);
  });

  it('should return status code 401 if db constraint is violated', async () => {
    const res = await request(app)
      .post('/api/${name}s')
      .send({
        title  : 'test is cool',
        content: 'Lorem ipsum',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const res = await request(app)
      .get('/api/${name}s/100')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .set('x-token', token);
    expect(res.statusCode).toEqual(404);
  });
});
`
  },
// endregion
  // region validator
  validator       : ` const Joi = require('joi');

// joi query schema 
export const create = {
  body: {
    },
};

// joi query schema
export const getAll = {
  query: {
    id: Joi.number()
      .required()
  },
};

// joi query schema
export const getOne = {
  query: {
    id: Joi.number()
      .required()
  },
};

// joi params schema
export const update = {
  params: {
    id: Joi.number()
      .required()
  },
};

// joi params schema
export const remove = {
  params: {
    id: Joi.number()
      .required()
  },
};
  `
// endregion
};

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
        progress.tick(); // msg 2
        console.log(chalk.hex(colors.lightGreen)(` Creating controller file...`));
      })
      .then(() => {
        commander(`touch ${directory}/${name}/${name}.controller.js`)
          .then(() => {
            progress.tick(); // msg 3
            console.log(chalk.hex(colors.lightGreen)(` Adding controller code stubs...`));

            commander(`echo "${boilerplate.controller(name, modelName)}" > ${directory}/${name}/${name}.controller.js`)
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
            console.log(chalk.hex(colors.lightGreen)(` Adding controller spec code...`));
            commander(`echo "${boilerplate.validator}" > ${directory}/${name}/${name}.spec.js`)
              .then(() => {
                progress.tick(); // msg 6
                console.log(chalk.hex(colors.lightGreen)(` Creating routes spec...`));
              }).catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .then(() => {
        commander(`touch ${directory}/${name}/${name}.routes.spec.js`)
          .then(() => {
            progress.tick(); // msg 5
            console.log(chalk.hex(colors.lightGreen)(` Adding routes spec code...`));
            commander(`echo "${boilerplate.routesTests(name, modelName)}" > ${directory}/${name}/${name}.routes.spec.js`)
              .then(() => {
                progress.tick(); // msg 6
                console.log(chalk.hex(colors.lightGreen)(` Creating validator...`));
              }).catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .then(() => {
        commander(`touch ${directory}/${name}/${name}.validator.js`)
          .then(() => {
            progress.tick(); // msg 7
            console.log(chalk.hex(colors.lightGreen)(` Adding validator code stubs...`));
            commander(`echo "${boilerplate.validator}" > ${directory}/${name}/${name}.validator.js`)
              .then(() => {
                progress.tick(); // msg 8
                console.log(chalk.hex(colors.lightGreen)(` Done in ${+new Date() - startTime}ms`));
              }).catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .catch((e) => {
        console.log(chalk.redBright(`A directory ${chalk.bold(name)} may already exists in the controllers directory`));
        console.log(e);
      });
  } else {
    // make-controller --name=ama
    console.log(`Required parameter, ${chalk.bold.greenBright('--name')} is missing`);
    __interface.prompt();
  }
};
