import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { SignIn } from '../SignIn';

const userResponse = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: config.baseUrl,
};

const server = setupServer(
  rest.get(`${config.baseUrl}/users`, (_, res, ctx) => {
    return res(ctx.json([userResponse]));
  }),
);

let signIn: SignIn;
let userGateway: UserGateway;
let userRepository: UserRepository;

describe('Sign in use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    userGateway = new UserGateway();
    userRepository = new UserRepository();
    signIn = new SignIn(userGateway, userRepository);
  });

  it('should be able to sign in', async () => {
    const user = await signIn.execute({
      email: 'john@doe.com',
      password: '1234567',
    });

    expect(user).toHaveProperty('id');
  });
});
