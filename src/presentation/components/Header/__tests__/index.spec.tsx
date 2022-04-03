import { act, fireEvent, render, screen } from '@testing-library/react';

import { Header } from '..';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Header component', () => {
  const props = {
    user: {
      id: '7',
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'john@doe.com',
      avatar: 'https://github.com/avrcoelho.png',
    },
    signOut: () =>
      ({
        execute: jest.fn(),
      } as any),
  };

  it('should be able to render component', () => {
    expect(() => render(<Header {...props} />)).not.toThrow();
  });

  it('should be able to sign out user', () => {
    render(<Header {...props} />);

    act(() => {
      fireEvent.click(screen.getByLabelText(props.user.name));
    });
    fireEvent.click(screen.getByText('Sair'));

    expect(mockNavigate).toBeCalled();
  });
});
