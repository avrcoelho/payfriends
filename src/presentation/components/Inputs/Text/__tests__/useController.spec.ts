import { act, renderHook } from '@testing-library/react-hooks';

import { useController } from '../useController';

describe('Text input hook controller', () => {
  it('should by able to return input type text', () => {
    const { result } = renderHook(useController);

    act(() => {
      result.current.togglePasswordVisibility();
    });

    expect(result.current.inputType).toBe('text');
  });

  it('should by able to return input type password', () => {
    const { result } = renderHook(useController);

    act(() => {
      result.current.togglePasswordVisibility();
    });
    act(() => {
      result.current.togglePasswordVisibility();
    });

    expect(result.current.inputType).toBe('password');
  });
});
