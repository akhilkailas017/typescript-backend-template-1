import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import { connectTestDB, disconnectTestDB, clearDB } from './setup';

describe('Auth Endpoints', () => {
  before(async () => {
    await connectTestDB();
  });

  after(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('user');
    expect(res.body.user.email).to.equal('test@example.com');
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
  });

  it('should login a user', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123!',
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
  });

  it('should refresh token', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123!',
    });

    const res = await request(app).post('/api/auth/refresh').send({
      token: login.body.refreshToken,
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
  });

  it('should logout', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123!',
    });

    const res = await request(app).post('/api/auth/logout').send({
      token: login.body.refreshToken,
    });
    expect(res.status).to.equal(200);
    expect(res.body.message).eql('Logged out successfully');
  });
});
