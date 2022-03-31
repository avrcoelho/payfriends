import {
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import ReactModal from 'react-modal';
import { FiX } from 'react-icons/fi';

import { Colors } from '../../constants/Colors';
import { useController, TIMEOUT } from './useController';
import './applicationModal.scss';
import { Container, Header, Button, CrossIconContainer, Title } from './styles';

ReactModal.setAppElement('body');

export interface ModalHandles {
  openModal(): void;
  closeModal(): void;
}

interface ModalProps {
  title: string;
  children: ReactNode;
}

const ModalImplemtation: ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { children, title },
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
      <Header>
        <Title>{title}</Title>

        <Button
          type="button"
          aria-label="close"
          data-testid="CloseModalButton"
          onClick={onCloseModal}
        >
          <CrossIconContainer>
            <FiX color={Colors.LightGrey} size={20} />
          </CrossIconContainer>
        </Button>
      </Header>

      <div className="content">{children}</div>
    </Container>
  );
};

export const Modal = forwardRef(ModalImplemtation);
