import styled from 'styled-components';

import { ButtonDefault } from '@/presentation/components/Buttons/Default';
import { Colors } from '@/presentation/constants/Colors';

export const Container = styled.main`
  height: 100vh;
  display: flex;
  align-items: stretch;

  svg:last-child {
    margin: auto;
  }

  @media (max-width: 940px) {
    svg:last-child {
      display: none;
    }
  }
`;

export const SignContainer = styled.section`
  width: 100%;
  max-width: 54rem;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 10.7rem;

  background-color: ${Colors.LightGrey1};

  h1 {
    color: ${Colors.Black};
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 3rem;
    line-height: 3.7rem;

    margin: 1.8rem 0 3.2rem;
  }

  @media (max-width: 940px) {
    max-width: 100%;

    h1 {
      font-size: 2.4rem;
      line-height: 2.8rem;
    }
  }

  @media (max-width: 540px) {
    padding: 0 2rem;
  }
`;

export const Button = styled(ButtonDefault)`
  margin-top: 3.5rem;
`;
