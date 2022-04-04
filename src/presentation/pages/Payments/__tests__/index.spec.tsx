import { render, screen } from '@testing-library/react';
import { Payments } from '..';

const user = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: 'https://github.com/avrcoelho.png',
};

const mockUseControllerReturn = {
  user,
  onUpdateLimit: jest.fn(),
  onUpdatePage: jest.fn(),
  page: 1,
  limit: 7,
  paymentsData: {},
  hasPaymentsData: false,
  modalType: 'delete',
  modalRef: {
    current: '',
  },
  onOpenModalToCreate: jest.fn(),
  search: '',
  onSetSearch: jest.fn(),
};
jest.mock('../useController', () => ({
  useController: () => mockUseControllerReturn,
}));
jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: jest.fn(),
  }),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Payments page', () => {
  const props = {
    getUser: () => ({
      execute: jest.fn(),
    }),
    getUsers: () => ({
      execute: jest.fn(),
    }),
    getPayments: () => ({
      execute: jest.fn(),
    }),
    signOut: () => ({
      execute: jest.fn(),
    }),
    updatePaymentStatus: jest.fn(),
    updatePayment: jest.fn(),
    createPayment: jest.fn(),
    deletePayment: jest.fn(),
  } as any;

  it('should not be able to render title', () => {
    render(<Payments {...props} />);

    expect(screen.queryByText('Meus pagamentos')).toBeFalsy();
  });

  it('should be able to render title', () => {
    Object.assign(mockUseControllerReturn, {
      paymentsData: {
        data: [],
        total: 0,
      },
      hasPaymentsData: true,
      modalType: 'create',
    });
    render(<Payments {...props} />);

    expect(screen.queryByText('Meus pagamentos')).toBeTruthy();
  });
});
