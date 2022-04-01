import { renderHook, act } from '@testing-library/react-hooks';

import { useController } from '../useController';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockNotificationError = jest.fn();
jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: mockNotificationError,
  }),
}));

describe('SignIn hook controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    signIn: jest.fn().mockReturnValue({ execute: jest.fn() }),
  };
  const onSubmitParams = {
    email: 'john@doe.com',
    password: '1234567',
  };
  it('should ba able to redirect to payments route', async () => {
    props.signIn().execute.mockResolvedValueOnce({ id: '1' });
    const { result, waitForNextUpdate } = renderHook(() =>
      useController(props),
    );

    act(() => {
      result.current.onSubmit(onSubmitParams);
    });
    await waitForNextUpdate();

    expect(mockNavigate).toBeCalled();
  });

  it('should ba able to dispatch notification error', async () => {
    props.signIn().execute.mockRejectedValueOnce();
    const { result, waitForNextUpdate } = renderHook(() =>
      useController(props),
    );

    act(() => {
      result.current.onSubmit(onSubmitParams);
    });
    await waitForNextUpdate();

    expect(mockNotificationError).toBeCalled();
  });
});
