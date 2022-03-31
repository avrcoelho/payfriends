import { render } from '@testing-library/react';

import { Routes } from '..';

jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: jest.fn(),
  }),
}));

describe('Routes', () => {
  it('should be able to render component', async () => {
    expect(() => {
      render(<Routes />);
    }).not.toThrow();
  });
});
