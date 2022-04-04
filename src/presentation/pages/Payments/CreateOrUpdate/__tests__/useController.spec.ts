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

const user = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: 'https://github.com/avrcoelho.png',
};

const paymentData = {
  userId: '1',
  title: 'Boeleto',
  id: '7',
  value: 700,
  date: '2022-03-20',
  status: true,
};

const mockGetUserExecute = jest.fn();
const props = {
  getUsers: () => ({
    execute: mockGetUserExecute,
  }),
  createPayment: jest.fn(),
  updatePayment: jest.fn(),
  onCloseModal: jest.fn(),
} as any;

describe('Add or update hook controller', () => {
  it('should be able to get users', async () => {
    mockGetUserExecute.mockResolvedValueOnce([user]);
    const { result, waitFor } = renderHook(() => useController(props));

    await act(() => Promise.resolve());

    await waitFor(() => {
      expect(result.current.users).toEqual([
        {
          value: '7',
          label: 'John Doe',
        },
      ]);
    });
  });

  it('should be able to disptach notification error on create', async () => {
    props.createPayment.mockRejectedValueOnce();
    mockModalType = 'create';
    const { result, waitFor, waitForNextUpdate } = renderHook(() =>
      useController(props),
    );

    act(() => {
      result.current.onSubmit(paymentData);
    });
    await waitForNextUpdate();

    await waitFor(() => {
      expect(mockNotificationError).toBeCalled();
    });
    await act(() => Promise.resolve());
  });

  it('should be able to disptach notification error on update', async () => {
    props.updatePayment.mockRejectedValueOnce();
    mockModalType = 'update';
    const { result, waitFor, waitForNextUpdate } = renderHook(() =>
      useController(props),
    );

    act(() => {
      result.current.onSubmit(paymentData);
    });
    await waitForNextUpdate();

    await waitFor(() => {
      expect(mockNotificationError).toBeCalled();
    });
    await act(() => Promise.resolve());
  });

  it('should be able to disptach notification success on create', async () => {
    props.createPayment.mockResolvedValueOnce({});
    mockModalType = 'create';
    const { result, waitFor } = renderHook(() => useController(props));

    act(() => {
      result.current.onSubmit(paymentData);
    });

    await waitFor(() => {
      expect(mockNotificationSuccess).toBeCalled();
    });
    await act(() => Promise.resolve());
  });

  it('should be able to disptach notification success on update', async () => {
    props.updatePayment.mockResolvedValueOnce({});
    mockModalType = 'update';
    const { result, waitFor } = renderHook(() => useController(props));

    act(() => {
      result.current.onSubmit(paymentData);
    });

    await waitFor(() => {
      expect(mockNotificationSuccess).toBeCalled();
    });
    await act(() => Promise.resolve());
  });
});
