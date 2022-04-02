import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

export const Container = styled.label`
  display: block;
  position: relative;

  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;

    :checked ~ .checkmark:after {
      display: block;
    }
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.8rem;
    width: 1.8rem;

    border-radius: 0.4rem;
    background-color: ${Colors.Blue};

    :after {
      content: '';
      position: absolute;
      display: none;

      left: 0.6rem;
      top: 0.1rem;
      width: 0.5rem;
      height: 1rem;
      border: solid ${Colors.White};
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
`;
