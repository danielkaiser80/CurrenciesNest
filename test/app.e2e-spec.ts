import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(
        'This app is an example, for using and trying out NestJS while giving some use.',
      );
  });

  it('/currencies/USDX (GET)', () => {
    return request(app.getHttpServer())
      .get('/currencies/USDX')
      .expect(400)
      .expect('Invalid ISO code');
  });
});
