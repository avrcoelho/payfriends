import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';
import { ButtonDefault } from '@/presentation/components/Buttons/Default';
import { InputText } from '../../components/Inputs/Text';

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 6.5rem 1rem 0;
  background: ${Colors.LightGrey1};

  @media (max-width: 940px) {
    padding: 3.5rem 1rem 0;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 134.4rem;
  margin: auto;
`;

export const Title = styled.h1`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 3.6rem;
  line-height: 4.4rem;
  color: ${Colors.Black2};

  @media (max-width: 940px) {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
`;

export const ButtonAddPayment = styled(ButtonDefault)`
  width: auto;
  padding: 0 1.4rem;
  margin-left: auto;
`;

export const PaymentsGrid = styled.div`
  width: 100%;
  border-radius: 0.8rem;

  background: ${Colors.White};

  margin-top: 2.1rem;
`;

export const GridControls = styled.div`
  padding: 1.6rem 1.4rem;

  &,
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SearchContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 0.8rem;
  }
`;

export const InputSearch = styled(InputText)`
  width: 21.5rem;
  height: 3.2rem;

  div {
    padding: 0 0.8rem;
  }
`;
