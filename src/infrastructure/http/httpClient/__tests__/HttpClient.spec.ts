import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { HttpClient } from '../HttpClient';

const url = 'http://localhost:3333';

class TestHttpClient extends HttpClient {
  async get(url: string): Promise<any> {
    return this.getRequest({ url });
  }

  async post(url: string): Promise<any> {
    return this.postRequest({ url });
  }

  async put(url: string): Promise<any> {
    return this.putRequest({ url });
  }

  async delete(url: string): Promise<any> {
    return this.deleteRequest({ url });
  }

  async patch(url: string): Promise<any> {
    return this.patchRequest({ url });
  }
}

const responseData = ['a', 'b', 'c'];
const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json(responseData));
  }),
  rest.post(url, (req, res, ctx) => {
    return res(ctx.json(responseData));
  }),
  rest.put(url, (req, res, ctx) => {
    return res(ctx.json(responseData));
  }),
  rest.delete(url, (req, res, ctx) => {
    return res(ctx.status(202));
  }),
  rest.patch(url, (req, res, ctx) => {
    return res(ctx.json(responseData));
  }),
);

let testHttpClient: TestHttpClient;

describe('Axios HTTP Client', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    testHttpClient = new TestHttpClient();
  });

  it('should be able to return data on method GET', async () => {
    const { data } = await testHttpClient.get(url);

    expect(data).toEqual(responseData);
  });

  it('should be able to return data on method POST', async () => {
    const { data } = await testHttpClient.post(url);

    expect(data).toEqual(responseData);
  });

  it('should be able to return data on method put', async () => {
    const { data } = await testHttpClient.put(url);

    expect(data).toEqual(responseData);
  });

  it('should be able to return status on method delete', async () => {
    const { status } = await testHttpClient.delete(url);

    expect(status).toEqual(202);
  });

  it('should be able to return data on method patch', async () => {
    const { data } = await testHttpClient.patch(url);

    expect(data).toEqual(responseData);
  });
});
