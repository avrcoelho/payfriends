import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

export const Select = styled.select`
  height: 100%;
  width: inherit;
  color: ${Colors.Black};
  font-size: 1.6rem;
  border: none;
  font-weight: 400;
  outline: none;
  background: transparent;

  ::placeholder {
    color: ${Colors.Grey};
  }
`;
