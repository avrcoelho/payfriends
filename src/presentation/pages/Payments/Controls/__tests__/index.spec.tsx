import { fireEvent, render, screen } from '@testing-library/react';

import { Controls } from '..';

describe('Payments Controls component', () => {
  const props = {
    limit: 10,
    onUpdateLimit: jest.fn(),
    onUpdatePage: jest.fn(),
    page: 7,
    total: 70,
    search: '',
    onSetSearch: jest.fn(),
  };
  it('should be able to render component', () => {
    expect(() => render(<Controls {...props} />)).not.toThrow();
  });

  it('should be able to change input valut', () => {
    render(<Controls {...props} />);

    fireEvent.change(screen.getByPlaceholderText('Pesquisar por usuário'), {
      target: { value: 'test' },
    });

    expect(props.onSetSearch).toBeCalledWith('test');
  });
});
