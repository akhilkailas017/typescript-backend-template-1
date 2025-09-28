import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import { connectTestDB, disconnectTestDB, clearDB } from './setup';

describe('Basic user and admin Endpoints', () => {
  before(async () => {
    await connectTestDB();
  });

  after(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it('should create post', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123!',
    });

    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${login.body.accessToken}`)
      .send({
        content: 'hi..',
      });
    expect(res.status).to.equal(201);
    expect(res.body).have.property('content');
  });

  it('should get create post', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123!',
    });

    await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${login.body.accessToken}`)
      .send({
        content: 'hi..',
      });

    const res = await request(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${login.body.accessToken}`);
    expect(res.status).to.equal(200);
    expect(res.body[0]).have.property('content');
  });

  it('should get users admin', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123!',
    });

    await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${login.body.accessToken}`)
      .send({
        content: 'hi..',
      });

    const res = await request(app).get('/api/admin/users').set('x-api-key', 'superadminapikey');
    expect(res.status).to.equal(200);
    expect(res.body[0]).have.property('username');
  });
});
