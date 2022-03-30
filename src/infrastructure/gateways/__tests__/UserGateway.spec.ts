import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { UserGateway } from '../UserGateway';

const userResponse = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: config.baseUrl,
};

const server = setupServer(
  rest.get(`${config.baseUrl}/users/:id`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
  rest.post(`${config.baseUrl}/users/authentication`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);

let userGateway: UserGateway;

describe('UserGateway', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    userGateway = new UserGateway();
  });

  it('should be able to sign in', async () => {
    const signInData = await userGateway.signIn({
      email: 'john@doe.com',
      password: '1234567',
    });

    expect(signInData).toHaveProperty('id');
  });

  it('should be able to get user data', async () => {
    const userData = await userGateway.getById('123');

    expect(userData).toHaveProperty('id');
  });
});
