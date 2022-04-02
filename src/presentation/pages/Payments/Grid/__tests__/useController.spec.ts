import { renderHook, act } from '@testing-library/react-hooks';

import { useController } from '../useController';

const mockNotificationError = jest.fn();
jest.mock('react-hook-notification', () => ({
  useNotification: () => ({
    error: mockNotificationError,
  }),
}));

const mockExecute = jest.fn();
const props = {
  updatePaymentStatus: mockExecute,
};
describe('Grid hook controller', () => {
  it('should be able to dispatch notification when has error on update status', async () => {
    mockExecute.mockRejectedValueOnce('');
    const { result, waitFor } = renderHook(() => useController(props as any));

    act(() => {
      result.current.onUpdateStatus({ id: '1', status: true });
    });

    await waitFor(() => {
      expect(mockNotificationError).toBeCalled();
    });
  });

  it('should not be able to notification when has success on update status', async () => {
    mockExecute.mockResolvedValueOnce('');
    const { result, waitFor } = renderHook(() => useController(props as any));

    act(() => {
      result.current.onUpdateStatus({ id: '1', status: true });
    });

    await waitFor(() => {
      expect(mockNotificationError).not.toBeCalled();
    });
    await act(() => Promise.resolve());
  });
});
