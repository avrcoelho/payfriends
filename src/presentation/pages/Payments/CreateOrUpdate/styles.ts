import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';
import { ButtonDefault } from '@/presentation/components/Buttons/Default';

export const Container = styled.div`
  width: 77.2rem;
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

  @media (max-width: 500px) {
    min-width: 100%;
  }
`;

export const InputsContainer = styled.form`
  display: grid;
  grid-template-columns: auto auto;
  gap: 4rem;

  @media (max-width: 800px) {
    grid-template-columns: auto;
  }

  > div {
    margin-top: 0;
  }
`;

export const ButtonsContainer = styled.div`
  width: fit-content;

  display: flex;
  justify-content: space-between;
  margin-top: 5.2rem;
  margin-left: auto;
`;

export const Button = styled(ButtonDefault)`
  width: 15rem;

  + button {
    margin-left: 3rem;
  }

  &.cancel {
    background-color: ${Colors.LightGrey3};
    color: ${Colors.GrayScale};
  }
`;
