import { act, renderHook } from '@testing-library/react-hooks';

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
});
