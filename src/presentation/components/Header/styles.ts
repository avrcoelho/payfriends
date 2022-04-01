import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

export const Container = styled.header`
  width: 100%;
  height: 9rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 3rem;
  background-color: ${Colors.Blue2};

  @media (max-width: 940px) {
    height: 7rem;
    padding: 0 1rem;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
`;
