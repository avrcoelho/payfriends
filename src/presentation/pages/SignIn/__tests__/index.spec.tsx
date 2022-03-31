import { render } from '@testing-library/react';

import { SignIn } from '..';

jest.mock('../useController', () => ({
  useController: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
    onSubmit: jest.fn(),
    isLoading: false,
  }),
}));

describe('SignIn page', () => {
  const props = {
    signIn: jest.fn().mockReturnValue({ execute: jest.fn() }),
  };

  it('should be able to render page', () => {
    expect(() => {
      render(<SignIn {...props} />);
    }).not.toThrow();
  });
});
