import request from 'supertest';
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
