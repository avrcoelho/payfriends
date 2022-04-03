import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';
import { ButtonDefault } from '@/presentation/components/Buttons/Default';

export const Container = styled.div`
  width: 40.5rem;
  padding: 4rem 3.8rem;

  color: ${Colors.GrayScale};

  h3 {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.2rem;

    margin-bottom: 4.721rem;
  }

  p {
    font-size: 1.6rem;
    line-height: 2.4rem;

    letter-spacing: 0.015rem;

    + p {
      margin-top: 1rem;
    }
  }

  @media (max-width: 500px) {
    min-width: 100%;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 5.2rem;
`;

export const Button = styled(ButtonDefault)`
  width: 15rem;

  &.cancel {
    background-color: ${Colors.LightGrey3};
    color: ${Colors.GrayScale};
  }
`;
