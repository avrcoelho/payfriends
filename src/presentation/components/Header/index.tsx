import React from 'react';

import { User } from '@/entities/User';
import { ReactComponent as Logo } from '@/presentation/assets/svgs/Logo-White.svg';
import { Avatar, Container } from './styles';

type HeaderProps = {
  user: User;
};

export const Header = ({ user }: HeaderProps): JSX.Element => {
  return (
    <Container>
      <Logo />

      <Avatar src={user.avatar} alt={user.name} width={45} height={45} />
    </Container>
  );
};
