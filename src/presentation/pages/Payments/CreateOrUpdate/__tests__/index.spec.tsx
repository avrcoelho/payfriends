import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import { CreateOrUpdate } from '..';

jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: jest.fn(),
    success: jest.fn(),
  }),
}));

let mockModalType = 'create';
jest.mock('@/presentation/store/useStore', () => {
  return {
    useStore: jest.fn(callback =>
      callback({
        onRefetch: jest.fn(),
        onUpdatePayment: jest.fn(),
        payment: { id: '123' },
        modalType: mockModalType,
        modalRef: {
          closeModal: jest.fn(),
        },
      }),
    ),
  };
});

describe('CreateOrUpdate component', () => {
  const props = {
    createPayment: jest.fn(),
    updatePayment: jest.fn(),
    getUsers: jest.fn(),
  };
  it('should be able to render create title', () => {
    render(<CreateOrUpdate {...props} />);

    expect(screen.getByText('Adicionar pagamento'));
  });

  it('should be able to render update title', () => {
    mockModalType = 'update';
    render(<CreateOrUpdate {...props} />);

    expect(screen.getByText('Editar pagamento'));
  });
});
