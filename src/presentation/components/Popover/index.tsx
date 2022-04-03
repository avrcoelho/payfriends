import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useState,
} from 'react';

import { Container } from './styles';

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  width?: string;
}

export interface PopoverRef {
  show(): void;
  hide(): void;
}

const Component: ForwardRefRenderFunction<PopoverRef, PopoverProps> = (
  { children, content, width },
  ref,
) => {
  const [isVisible, setIsVisible] = useState(false);
  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <Container $width={width} $isVisible={isVisible}>
      {children}
      <span>{content}</span>
    </Container>
  );
};

export const Popover = forwardRef(Component);
