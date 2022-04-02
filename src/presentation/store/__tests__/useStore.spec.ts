import { act, renderHook } from '@testing-library/react-hooks';

import { Payment } from '@/entities/Payment';
import { useStore } from '../useStore';

describe('useStore', () => {
  it('should be able to update user id', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSaveUserId('1');
    });

    expect(result.current.userId).toBe('1');
  });

  it('should be able to delete user id', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSaveUserId('1');
    });
    act(() => {
      result.current.onDeleteUserId();
    });

    expect(result.current.userId).toBeNull();
  });

  const payments = [
    {
      user: {
        id: '7',
      },
      id: '7',
      value: 700,
      timestamp: Date.now(),
      status: true,
    },
    {
      user: {
        id: '7',
      },
      id: '0',
      value: 700,
      timestamp: Date.now(),
      status: true,
    },
  ] as Payment[];

  it('should be able to set paymnets', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPayments(payments);
    });

    expect(result.current.payments).toEqual(payments);
  });

  it('should be able to update paymnet', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPayments(payments);
    });
    act(() => {
      result.current.onUpdatePayment({ ...payments[0], value: 10 });
    });

    expect(result.current.payments[0].value).toBe(10);
  });

  it('should be able to delete paymnet', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPayments(payments);
    });
    act(() => {
      result.current.onDeletePayment('7');
    });

    expect(result.current.payments).toHaveLength(1);
  });

  it('should be able to update status paymnet', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPayments(payments);
    });
    act(() => {
      result.current.onUpdatePaymentStatus({ id: '7', status: false });
    });

    expect(result.current.payments[0].status).toBeFalsy();
  });
});
