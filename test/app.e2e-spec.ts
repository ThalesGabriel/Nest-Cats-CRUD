import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { CatModel } from 'src/cats/intefaces/catModel.interface';
import { UpdateCatInput } from 'src/cats/dto/update-cat.input';
import { CreateCatInput } from 'src/cats/dto/create-cat.input';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });

  const cat: CreateCatInput = {
    name: 'New cat',
    kind: 'General',
    breed: 'Brown',
  };

  let id: string = '';

  const updatedCat: UpdateCatInput = {
    name: 'Updated cat',
    kind: 'General',
    breed: 'Brown',
  };

  const createCatObject = JSON.stringify(cat).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  const createCatMutation = `
    mutation {
      createCat(input: ${createCatObject}) {
        id
        name
        kind
        breed
      }
    }
  `;

  it('createCat', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createCatMutation,
      })
      .expect(({ body }) => {
        console.log('ooooopa', body)
        const data = body.data.createCat;
        id = data.id;
        expect(data.name).toBe(cat.name);
        expect(data.kind).toBe(cat.kind);
        expect(data.breed).toBe(cat.breed);
      })
      .expect(200);
  });

  const updateCatObject = JSON.stringify(updatedCat).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('updateCat', () => {
    const updateCatMutation = `
      mutation {
        updateCat(id: "${id}", input: ${updateCatObject}) {
          name
          kind
          breed
          id
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateCatMutation,
      })
      .expect(({ body }) => {
        const data = body.data.updateCat;
        expect(data.name).toBe(updatedCat.name);
        expect(data.kind).toBe(updatedCat.kind);
        expect(data.breed).toBe(updatedCat.breed);
      })
      .expect(200);
  });

  it('deleteCat', () => {
    const deleteCatQuery = `
      mutation {
        deleteCat(id: "${id}") {
          name
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteCatQuery,
      })
      .expect(({ body }) => {
        const data = body.data.deleteCat;
        expect(data.name).toBe(updatedCat.name);
      })
      .expect(200);
  });
});
