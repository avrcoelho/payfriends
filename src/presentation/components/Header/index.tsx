import { useMemo, useRef } from 'react';

import { User } from '@/entities/User';
import { SignOut } from '@/useCases/SignOut';
import { ReactComponent as Logo } from '@/presentation/assets/svgs/Logo-White.svg';
import { Popover, PopoverRef } from '../Popover';
import { Avatar, Container, Button } from './styles';
import { useController } from './useController';

type HeaderProps = {
  user: User;
  signOut(): SignOut;
};

export const Header = ({ user, signOut }: HeaderProps): JSX.Element => {
  const { onSignOut, popoverRef, elementRef } = useController({ signOut });

  const buttonSignOut = useMemo(() => {
    return <Button onClick={onSignOut}>Sair</Button>;
  }, [onSignOut]);

  return (
    <Container>
      <Logo />

      <Popover content={buttonSignOut} ref={popoverRef}>
        <Avatar
          ref={elementRef}
          src={user.avatar}
          alt={user.name}
          width={45}
          height={45}
          onClick={popoverRef.current?.show}
          aria-label={user.name}
          title="Perfil"
        />
      </Popover>
    </Container>
  );
};
