import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetUsers } from '../GetUsers';

let getUsers: GetUsers;
let userGateway: UserGateway;

const userResponse = {
  id: '1',
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

describe('Get user use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    userGateway = new UserGateway();
    getUsers = new GetUsers(userGateway);
  });

  it('should not be able to get users', async () => {
    const user = await getUsers.execute();

    expect(user).toHaveLength(1);
  });
});
