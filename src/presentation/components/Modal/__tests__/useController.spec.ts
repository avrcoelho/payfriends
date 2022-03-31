import { renderHook, act } from '@testing-library/react-hooks';

import { useController, TIMEOUT } from '../useController';

jest.useFakeTimers();

describe('COntorller of modal component', () => {
  it('should be able to open modal', () => {
    const { result } = renderHook(() => useController());

    act(() => {
      result.current.onOpenModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should be able to open modal', () => {
    const { result } = renderHook(() => useController());

    act(() => {
      result.current.onOpenModal();
    });
    act(() => {
      result.current.onCloseModal();
      jest.advanceTimersByTime(TIMEOUT);
    });

    expect(result.current.isOpen).toBe(false);
  });
});
