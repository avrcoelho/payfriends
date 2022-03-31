import { render, screen, fireEvent } from '@testing-library/react';

import { InputText } from '..';

let mockPasswordIsVisible = false;
const mockTogglePasswordVisibility = jest.fn();
let mockInputType = 'text';
jest.mock('../useController', () => ({
  useController: () => ({
    passwordIsVisible: mockPasswordIsVisible,
    togglePasswordVisibility: mockTogglePasswordVisibility,
    inputType: mockInputType,
  }),
}));

describe('Input text component', () => {
  it('should be able to render input password', () => {
    mockInputType = 'password';
    render(
      <InputText
        label="Test"
        name="test"
        placeholder="Password"
        type="password"
        register={{} as any}
      />,
    );

    expect(screen.getByPlaceholderText(/password/i).getAttribute('type')).toBe(
      'password',
    );
  });

  it('should be able to render input password', () => {
    mockInputType = 'password';
    render(
      <InputText
        label="Test"
        name="test"
        placeholder="Password"
        type="password"
        register={{} as any}
      />,
    );

    expect(screen.getByPlaceholderText(/password/i).getAttribute('type')).toBe(
      'password',
    );
  });

  it('should be able to toggle password visibility', () => {
    mockInputType = 'password';
    mockPasswordIsVisible = true;
    render(
      <InputText
        label="Test"
        name="test"
        placeholder="Password"
        type="password"
        register={{} as any}
      />,
    );

    fireEvent.click(screen.getByLabelText('Toggle password'));

    expect(mockTogglePasswordVisibility).toBeCalled();
  });

  it('should be able to render message error', () => {
    render(
      <InputText
        label="Test"
        name="test"
        placeholder="Password"
        error="its error"
        register={{} as any}
      />,
    );

    expect(screen.getByText('its error')).toBeTruthy();
  });
});
