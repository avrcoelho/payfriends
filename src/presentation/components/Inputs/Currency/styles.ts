import styled from 'styled-components';
import CurrencyInput from 'react-currency-input';

import { Colors } from '@/presentation/constants/Colors';

export const Input = styled(CurrencyInput)`
  height: 100%;
  width: inherit;
  color: ${Colors.Black};
  font-size: 1.6rem;
  border: none;
  font-weight: 400;
  outline: none;
  background: transparent;
  z-index: 1;

  ::placeholder {
    color: ${Colors.Grey};
  }

  :focus + label,
  :not(:placeholder-shown) + label {
    transform: scale(0.8);
    top: -1rem;
    left: 1rem;
  }
`;
