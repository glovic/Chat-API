// tests/auth.test.js
const request = require('supertest');
const app = require('../server'); // Assuming this is your Express app

describe('User Signup', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'securepassword'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
  });
});

