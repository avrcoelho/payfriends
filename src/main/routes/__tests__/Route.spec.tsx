import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen } from '@testing-library/react';

import { RoutePaths } from '@/presentation/constants/routePaths';
import { Route as CustomRoute } from '../Route';

const SignInPage = (): JSX.Element => <>SignIn</>;
const PaymentsPage = (): JSX.Element => <>Payments</>;

describe('Route', () => {
  const renderWithRouter = ({ initialEntry }: { initialEntry: string }) =>
    render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path={RoutePaths.SignIn}
            element={<CustomRoute element={<SignInPage />} />}
          />
          <Route
            path={RoutePaths.Payments}
            element={<CustomRoute isPrivate element={<PaymentsPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

  it('should be able to redirect to signin page', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
    renderWithRouter({
      initialEntry: RoutePaths.Payments,
    });

    expect(screen.getByText('SignIn')).toBeTruthy();
  });

  it('should be able to redirect to payments page', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce('id');
    renderWithRouter({
      initialEntry: RoutePaths.SignIn,
    });

    expect(screen.getByText('SignIn')).toBeTruthy();
  });

  it('should be able to redirect to signin page', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
    renderWithRouter({
      initialEntry: RoutePaths.SignIn,
    });

    expect(screen.getByText('SignIn')).toBeTruthy();
  });
});
