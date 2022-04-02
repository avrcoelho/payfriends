import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';
import { InputSelect } from '../Select';

export const Container = styled.div`
  display: flex;
  align-items: center;

  margin-right: 3rem;
`;

export const Label = styled.label`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: ${Colors.SecondaryText};

  margin-right: 1.2rem;
`;

export const Select = styled(InputSelect)`
  width: 7.7rem;
  height: 3.2rem;

  select {
    font-size: 1.4rem;
  }
`;
