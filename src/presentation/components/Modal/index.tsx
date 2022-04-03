import {
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import ReactModal from 'react-modal';

import { useController, TIMEOUT } from './useController';
import './applicationModal.scss';
import { Container } from './styles';

ReactModal.setAppElement('body');

export interface ModalHandles {
  openModal(): void;
  closeModal(): void;
}

interface ModalProps {
  children: ReactNode;
}

const ModalImplemtation: ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { children },
  ref,
) => {
  const { isOpen, onCloseModal, onOpenModal } = useController();

  useImperativeHandle(ref, () => {
    return {
      openModal: onOpenModal,
      closeModal: onCloseModal,
    };
  });

  return (
    <Container
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      closeTimeoutMS={TIMEOUT}
    >
      {children}
    </Container>
  );
};

export const Modal = forwardRef(ModalImplemtation);
