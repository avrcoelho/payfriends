import { fireEvent, render, screen } from '@testing-library/react';

import { Payment } from '@/entities/Payment';
import { Delete } from '..';

const mockControllerReturn = {
  onCloseModal: jest.fn(),
  isLoading: false,
  onDelete: jest.fn(),
  payment: undefined as Payment | undefined,
};
jest.mock('../useController', () => ({
  useController: () => mockControllerReturn,
}));

const payment = {
  user: {
    id: '7',
    name: 'John Doe',
    nickname: 'johndoe',
    email: 'john@doe.com',
  },
  id: '7',
  title: 'Boeleto',
  value: 700,
  date: '2022-03-20',
  status: true,
} as Payment;

describe('Delete hook controller', () => {
  it('should not be able to render component', () => {
    render(<Delete deletePayment={jest.fn()} />);

    expect(screen.queryByText(/Excluir pagamento/i)).toBeFalsy();
  });

  it('should be able to render component', () => {
    mockControllerReturn.payment = payment;
    render(<Delete deletePayment={jest.fn()} />);

    expect(screen.queryByText(/Excluir pagamento/i)).toBeTruthy();
  });

  it('should be able to confirm delete', () => {
    render(<Delete deletePayment={jest.fn()} />);

    fireEvent.click(screen.getByText('Excluir'));

    expect(mockControllerReturn.onDelete).toBeCalled();
  });

  it('should be able to cancel', () => {
    render(<Delete deletePayment={jest.fn()} />);

    fireEvent.click(screen.getByText('Cancelar'));

    expect(mockControllerReturn.onCloseModal).toBeCalled();
  });
});
