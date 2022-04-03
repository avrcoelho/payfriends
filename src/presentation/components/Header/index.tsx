import { useMemo } from 'react';

import { User } from '@/entities/User';
import { SignOut } from '@/useCases/SignOut';
import { ReactComponent as Logo } from '@/presentation/assets/svgs/Logo-White.svg';
import { Popover } from '../Popover';
import { Avatar, Container, ButtonSignOut, ButtonProfile } from './styles';
import { useController } from './useController';

type HeaderProps = {
  user: User;
  signOut(): SignOut;
};

export const Header = ({ user, signOut }: HeaderProps): JSX.Element => {
  const { onSignOut, popoverRef, elementRef } = useController({ signOut });

  const buttonSignOut = useMemo(() => {
    return <ButtonSignOut onClick={onSignOut}>Sair</ButtonSignOut>;
  }, [onSignOut]);

  return (
    <Container>
      <Logo />

      <div ref={elementRef}>
        <Popover content={buttonSignOut} ref={popoverRef}>
          <ButtonProfile
            onClick={popoverRef.current?.show}
            aria-label={user.name}
            title="Perfil"
          >
            <Avatar src={user.avatar} alt={user.name} width={45} height={45} />
          </ButtonProfile>
        </Popover>
      </div>
    </Container>
  );
};
