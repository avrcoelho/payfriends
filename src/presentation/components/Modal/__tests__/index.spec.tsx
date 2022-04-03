import { useRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { Modal, ModalHandles } from '..';

const Component = (): JSX.Element => {
  const modalRef = useRef<ModalHandles>(null);

  return (
    <>
      <button type="button" onClick={() => modalRef.current?.openModal()}>
        open modal
      </button>
      <button type="button" onClick={() => modalRef.current?.closeModal()}>
        close modal
      </button>
      <Modal ref={modalRef}>children</Modal>
    </>
  );
};

describe('Modal component', () => {
  it('should be able to open modal', () => {
    render(<Component />);
    const buttonOpenModal = screen.getByText('open modal');

    act(() => {
      fireEvent.click(buttonOpenModal);
    });

    expect(screen.getByText('children')).toBeTruthy();
  });
});
