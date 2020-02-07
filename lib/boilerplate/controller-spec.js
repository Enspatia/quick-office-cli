import MockExpressResponse from 'mock-express-response';
import { getAll, getOne, update, remove } from './${name}.controller';

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
  });

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
  });

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
