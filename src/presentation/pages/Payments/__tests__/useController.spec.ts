import { renderHook, act } from '@testing-library/react-hooks';

import { useController } from '../useController';

const mockNotificationError = jest.fn();
jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: mockNotificationError,
  }),
}));

let mockPaymentsData = {};
let mockHasRefetch = false;
const mockOnRefetch = jest.fn();
jest.mock('@/presentation/store/useStore', () => {
  return {
    useStore: jest.fn(callback =>
      callback({
        userId: '1',
        onSetPaymentsData: jest.fn().mockImplementation(value => {
          mockPaymentsData = value;
        }),
        onRefetch: mockOnRefetch,
        paymentsData: mockPaymentsData,
        hasRefetch: mockHasRefetch,
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

describe('Payments page hook controller', () => {
  const mockGetUserExecute = jest.fn();
  const mockGetPaymentsExecute = jest.fn();
  const props = {
    getUser: () => ({
      execute: mockGetUserExecute,
    }),
    getPayments: () => ({
      execute: mockGetPaymentsExecute,
    }),
  } as any;

  it('should be able to dispatch notification when has error on get user data', async () => {
    mockGetUserExecute.mockRejectedValueOnce('');
    renderHook(() => useController(props));

    await act(() => Promise.resolve());

    expect(mockNotificationError).toBeCalled();
  });

  it('should be able to dispatch notification when has error on get payments', async () => {
    mockGetUserExecute.mockResolvedValueOnce(user);
    mockGetPaymentsExecute.mockRejectedValueOnce('');
    renderHook(() => useController(props));

    await act(() => Promise.resolve());

    expect(mockNotificationError).toBeCalled();
  });

  it('should be able to return payments', async () => {
    mockGetUserExecute.mockResolvedValueOnce(user);
    mockGetPaymentsExecute.mockResolvedValueOnce({ data: [], total: 0 });
    const { result, waitFor } = renderHook(() => useController(props));

    await act(() => Promise.resolve());

    await waitFor(() => {
      expect(result.current.paymentsData).toEqual({ data: [], total: 0 });
    });
  });

  it('should be able to update page', async () => {
    mockGetUserExecute.mockResolvedValueOnce(user);
    mockGetPaymentsExecute.mockRejectedValueOnce('');
    const { result, waitFor } = renderHook(() => useController(props));

    await act(() => Promise.resolve());
    act(() => {
      result.current.onUpdatePage(2);
    });
    await act(() => Promise.resolve());

    await waitFor(() => {
      expect(result.current.page).toBe(2);
    });
  });

  it('should be able to update limit', async () => {
    mockGetUserExecute.mockResolvedValueOnce(user);
    mockGetPaymentsExecute.mockRejectedValueOnce({ data: [], total: 0 });
    const { result, waitFor } = renderHook(() => useController(props));

    await act(() => Promise.resolve());
    act(() => {
      result.current.onUpdateLimit(2);
    });
    await act(() => Promise.resolve());

    await waitFor(() => {
      expect(result.current.limit).toBe(2);
    });
  });

  it('should not be able to call refetch when do not has refetch store', async () => {
    mockGetUserExecute.mockResolvedValueOnce(user);
    renderHook(() => useController(props));

    await act(() => Promise.resolve());

    expect(mockOnRefetch).not.toBeCalled();
  });

  it('should be able to call refetch when has refetch store', async () => {
    mockGetUserExecute.mockResolvedValueOnce(user);
    mockHasRefetch = true;
    renderHook(() => useController(props));

    await act(() => Promise.resolve());

    expect(mockOnRefetch).toBeCalled();
  });
});
