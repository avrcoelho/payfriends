import { render } from '@testing-library/react';

import { App } from '../App';

jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: jest.fn(),
  }),
}));

describe('App', () => {
  it('should be able to render App', () => {
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });
});
