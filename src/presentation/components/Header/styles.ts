import styled, { css } from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

export const Container = styled.header`
  width: 100%;
  height: 9rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 3rem;
  background-color: ${Colors.Blue2};

  position: fixed;
  top: 0;
  z-index: 2;

  @media (max-width: 940px) {
    height: 7rem;
    padding: 0 1rem;
  }
`;

const profileStyles = css`
  border-radius: 50%;
  cursor: pointer;
`;

export const ButtonProfile = styled.button`
  ${profileStyles}
`;

export const Avatar = styled.img`
  ${profileStyles}
`;

export const ButtonSignOut = styled.button`
  width: 4rem;
  height: 2rem;

  color: ${Colors.Red};
`;
