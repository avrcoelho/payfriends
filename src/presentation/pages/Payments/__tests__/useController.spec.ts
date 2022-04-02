import { renderHook, act } from '@testing-library/react-hooks';

import { useController } from '../useController';

const mockNotificationError = jest.fn();
jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: mockNotificationError,
  }),
}));

jest.mock('@/presentation/store/useStore', () => {
  return {
    useStore: jest.fn(callback =>
      callback({
        userId: '1',
        onSetPayments: jest.fn(),
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
  const props = {
    getUser: jest.fn(),
    getPayments: jest.fn(),
  };

  it('should be able to dispatch notification when has error on get user data', async () => {
    props.getUser.mockImplementationOnce(() => ({
      execute: jest.fn().mockRejectedValueOnce(''),
    }));
    renderHook(() => useController(props));

    await act(() => Promise.resolve());

    expect(mockNotificationError).toBeCalled();
  });

  it('should be able to dispatch notification when has error on get payments', async () => {
    props.getUser.mockImplementationOnce(() => ({
      execute: jest.fn().mockResolvedValueOnce(user),
    }));
    props.getPayments.mockImplementationOnce(() => ({
      execute: jest.fn().mockRejectedValueOnce(''),
    }));
    renderHook(() => useController(props));

    await act(() => Promise.resolve());

    expect(mockNotificationError).toBeCalled();
  });

  it('should be able to return payments', async () => {
    props.getUser.mockImplementationOnce(() => ({
      execute: jest.fn().mockResolvedValueOnce(user),
    }));
    props.getPayments.mockImplementationOnce(() => ({
      execute: jest.fn().mockResolvedValueOnce([]),
    }));
    const { result, waitFor } = renderHook(() => useController(props));

    await act(() => Promise.resolve());

    await waitFor(() => {
      expect(result.current.payments).toEqual([]);
    });
  });

  it('should be able to update page', async () => {
    props.getUser.mockImplementationOnce(() => ({
      execute: jest.fn().mockResolvedValueOnce(user),
    }));
    props.getPayments.mockImplementationOnce(() => ({
      execute: jest.fn().mockResolvedValueOnce([]),
    }));
    const { result, waitFor } = renderHook(() => useController(props));

    await act(() => Promise.resolve());
    act(() => {
      result.current.onUpdatePage(2);
    });

    await waitFor(() => {
      expect(result.current.page).toBe(2);
    });
  });

  it('should be able to update limit', async () => {
    props.getUser.mockImplementationOnce(() => ({
      execute: jest.fn().mockResolvedValueOnce(user),
    }));
    props.getPayments.mockImplementationOnce(() => ({
      execute: jest.fn().mockResolvedValueOnce([]),
    }));
    const { result, waitFor } = renderHook(() => useController(props));

    await act(() => Promise.resolve());
    act(() => {
      result.current.onUpdateLimit(2);
    });

    await waitFor(() => {
      expect(result.current.limit).toBe(2);
    });
  });
});
