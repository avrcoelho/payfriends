import { renderHook, act } from '@testing-library/react-hooks';

import { useController } from '../useController';

const mockNotificationError = jest.fn();
const mockNotificationSuccess = jest.fn();
jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: mockNotificationError,
    success: mockNotificationSuccess,
  }),
}));

const mockCloseModal = jest.fn();
jest.mock('@/presentation/store/useStore', () => {
  return {
    useStore: jest.fn(callback =>
      callback({
        onDeletePayment: jest.fn(),
        payment: { id: '123' },
        modalRef: {
          closeModal: mockCloseModal,
        },
      }),
    ),
  };
});

const props = {
  deletePayment: jest.fn(),
} as any;

describe('Delete hook controller', () => {
  it('should be able to disptach notification error on delete', async () => {
    props.deletePayment.mockRejectedValueOnce();
    const { result, waitFor } = renderHook(() => useController(props));

    act(() => {
      result.current.onDelete('7');
    });

    await waitFor(() => {
      expect(mockNotificationError).toBeCalled();
    });
    await act(() => Promise.resolve());
  });

  it('should be able to disptach notification success on delete', async () => {
    props.deletePayment.mockResolvedValueOnce();
    const { result, waitFor } = renderHook(() => useController(props));

    act(() => {
      result.current.onDelete('7');
    });

    await waitFor(() => {
      expect(mockNotificationSuccess).toBeCalled();
    });
    await act(() => Promise.resolve());
  });

  it('should be able to close modal', async () => {
    props.deletePayment.mockResolvedValueOnce();
    const { result } = renderHook(() => useController(props));

    result.current.onCloseModal();

    expect(mockCloseModal).toBeCalled();
  });
});
