import { render } from '@testing-library/react';

import { Grid } from '..';

jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: jest.fn(),
  }),
}));

const user = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: 'https://github.com/avrcoelho.png',
};
const props = {
  payments: [
    {
      user,
      title: 'Boeleto',
      id: '7',
      value: 700,
      timestamp: Date.now(),
      status: true,
    },
  ],
  updatePaymentStatus: jest.fn(),
};

describe('Grid component', () => {
  it('should be able to render component', () => {
    expect(() => render(<Grid {...props} />)).not.toThrow();
  });
});
