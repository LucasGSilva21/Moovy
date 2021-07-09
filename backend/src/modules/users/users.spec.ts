import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersModule } from './users.module';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../config/mongoose-test-module';

let app: INestApplication;
let service: UsersService;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      rootMongooseTestModule(),
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      UsersModule,
      AuthModule,
    ],
    providers: [UsersService],
  }).compile();

  app = module.createNestApplication();

  service = module.get<UsersService>(UsersService);

  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('GET /users', () => {
  it('should return an array of users', async () => {
    await service.create({
      name: 'test-get-all-0',
      email: 'testgetall0@mail.com',
      password: '123456',
    });
    await service.create({
      name: 'test-get-all-1',
      email: 'testgetall1@mail.com',
      password: '123456',
    });

    const getToken = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'testgetall0@mail.com', password: '123456' })
      .set('Accept', 'application/json');

    const { body } = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${getToken.body.access_token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toHaveLength(2);
  });
});

describe('GET /users/:id', () => {
  it('should return an user', async () => {
    const { _id } = await service.create({
      name: 'test-get-one-0',
      email: 'testgetone0@mail.com',
      password: '123456',
    });

    const getToken = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'testgetone0@mail.com', password: '123456' })
      .set('Accept', 'application/json');

    const { body } = await request(app.getHttpServer())
      .get(`/api/v1/users/${_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${getToken.body.access_token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body.name).toBe('test-get-one-0');
  });
});

describe('POST /users', () => {
  it('should not create an user', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({ name: 'test-fail-0' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should create an user', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({
        name: 'test-create-0',
        email: 'testcreate0@mail.com',
        password: '123456',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(body.name).toBe('test-create-0');
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a planet', async () => {
    const { _id } = await service.create({
      name: 'test-delete-0',
      email: 'testdelete0@mail.com',
      password: '123456',
    });

    const getToken = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'testdelete0@mail.com', password: '123456' })
      .set('Accept', 'application/json');

    await request(app.getHttpServer())
      .delete(`/api/v1/users/${_id}`)
      .set('Authorization', `Bearer ${getToken.body.access_token}`)
      .expect(204);
  });
});
