import { useState } from 'react';

export const TIMEOUT = 200;

type Hook = () => {
  isOpen: boolean;
  onOpenModal(): void;
  onCloseModal(): void;
};

export const useController: Hook = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = (): void => {
    setIsOpen(true);
  };

  const onCloseModal = (): void => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onCloseModal,
    onOpenModal,
  };
};
