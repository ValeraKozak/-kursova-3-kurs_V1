import request from 'supertest';
import app from '../src/app.js';

describe('Auth endpoints', () => {
  it('GET / should return API status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
