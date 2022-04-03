import { act, renderHook } from '@testing-library/react-hooks';

import { PaymentData } from '@/useCases/ports/paymentGateway';
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

  const paymentsData = {
    total: 2,
    data: [
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
    ],
  } as PaymentData;

  it('should be able to set paymnets', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPaymentsData(paymentsData);
    });

    expect(result.current.paymentsData.data).toEqual(paymentsData.data);
  });

  it('should be able to update paymnet', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPaymentsData(paymentsData);
    });
    act(() => {
      result.current.onUpdatePayment({ ...paymentsData.data[0], value: 10 });
    });

    expect(result.current.paymentsData.data[0].value).toBe(10);
  });

  it('should be able to delete paymnet', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPaymentsData(paymentsData);
    });
    act(() => {
      result.current.onDeletePayment('7');
    });

    expect(result.current.paymentsData.data).toHaveLength(1);
  });

  it('should be able to update status paymnet', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onSetPaymentsData(paymentsData);
    });
    act(() => {
      result.current.onUpdatePaymentStatus({ id: '7', status: false });
    });

    expect(result.current.paymentsData.data[0].status).toBeFalsy();
  });

  it('should be able to set has refetch true', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.onRefetch();
    });

    expect(result.current.hasRefetch).toBeTruthy();
  });
});
