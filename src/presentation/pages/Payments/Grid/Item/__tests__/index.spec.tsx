import { fireEvent, render, screen } from '@testing-library/react';

import { GridItem } from '..';

const user = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: 'https://github.com/avrcoelho.png',
};

const props = {
  payment: {
    user,
    userId: '1',
    title: 'Boeleto',
    id: '7',
    value: 700,
    date: '2022-03-20',
    status: true,
  },
  onUpdateStatus: jest.fn(),
  onUpdate: jest.fn(),
  onDelete: jest.fn(),
};

describe('GridItem component', () => {
  it('should be able to render component', () => {
    expect(() => render(<GridItem {...props} />)).not.toThrow();
  });

  it('should be able to change payment status', () => {
    render(<GridItem {...props} />);

    fireEvent.click(screen.getByLabelText('Status do pagamento'));

    expect(props.onUpdateStatus).toBeCalled();
  });

  it('should be able to call update', () => {
    render(<GridItem {...props} />);

    fireEvent.click(screen.getByLabelText('Editar'));

    expect(props.onUpdate).toBeCalled();
  });

  it('should be able to call delete', () => {
    render(<GridItem {...props} />);

    fireEvent.click(screen.getByLabelText('Excluir'));

    expect(props.onDelete).toBeCalled();
  });
});
