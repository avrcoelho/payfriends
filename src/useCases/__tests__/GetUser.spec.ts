import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetUser } from '../GetUser';

let getUser: GetUser;
let userGateway: UserGateway;

const userResponse = {
  id: '1',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: config.baseUrl,
};

const server = setupServer(
  rest.get(`${config.baseUrl}/users/:id`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);

describe('Get user use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    userGateway = new UserGateway();
    getUser = new GetUser(userGateway);
  });

  it('should not be able to get user ', async () => {
    const user = await getUser.execute('1');

    expect(user).toHaveProperty('id');
  });
});
