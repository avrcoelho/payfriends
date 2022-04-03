import { useRef } from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';

import { Popover, PopoverRef } from '..';

const Component = () => {
  const popoverRef = useRef<PopoverRef>(null);

  return (
    <>
      <p>Popover</p>
      <Popover ref={popoverRef} content="text test">
        <button onClick={() => popoverRef.current?.show()}>Show</button>
        <button onClick={() => popoverRef.current?.hide()}>Hide</button>
      </Popover>
    </>
  );
};

describe('Popover component', () => {
  it('should be able to show popover', () => {
    render(<Component />);
    const buttonShow = screen.getByText('Show');

    act(() => {
      fireEvent.click(buttonShow);
    });

    expect(screen.getByText('text test')).toBeTruthy();
  });

  it('should be able to hide popover', () => {
    render(<Component />);
    const buttonShow = screen.getByText('Show');
    const buttonHide = screen.getByText('Hide');

    act(() => {
      fireEvent.click(buttonShow);
    });
    act(() => {
      fireEvent.click(buttonHide);
    });

    expect(screen.getByText('text test')).toBeTruthy();
  });
});
