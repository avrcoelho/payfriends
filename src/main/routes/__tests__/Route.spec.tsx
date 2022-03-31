import { render, screen } from '@testing-library/react';

import { makeUserIsAuthenticated } from '../../factories/useCases/userIsAuthenticated';
import { Route as CustomRoute } from '../Route';

jest.mock('react-router-dom', () => ({
  Navigate: ({ to }: { to: any }) => to,
}));

const SignInPage = (): JSX.Element => <>SignIn</>;
const ProxyPage = (): JSX.Element => <>Proxy</>;

describe('Route', () => {
  it('should be able to render element', async () => {
    jest.spyOn(makeUserIsAuthenticated(), 'execute').mockReturnValueOnce(true);
    render(<CustomRoute isPrivate element={<SignInPage />} />);

    expect(screen.queryByText('SignIn')).toBeFalsy();
  });

  it('should be able to redirect to signin page', async () => {
    jest.spyOn(makeUserIsAuthenticated(), 'execute').mockReturnValueOnce(false);
    render(<CustomRoute element={<SignInPage />} />);

    expect(screen.getByText('SignIn')).toBeTruthy();
  });

  it('should be able to redirect to proxy page', async () => {
    jest.spyOn(makeUserIsAuthenticated(), 'execute').mockReturnValueOnce(false);
    render(<CustomRoute element={<ProxyPage />} />);

    expect(screen.getByText('Proxy')).toBeTruthy();
  });
});
