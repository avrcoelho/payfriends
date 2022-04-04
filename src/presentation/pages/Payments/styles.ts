import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';
import { ButtonDefault } from '@/presentation/components/Buttons/Default';

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 15.5rem 1rem 0;
  background: ${Colors.LightGrey1};

  @media (max-width: 940px) {
    padding: 11.5rem 1rem 0;
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
  color: ${Colors.GrayScale};

  @media (max-width: 940px) {
    font-size: 2.8rem;
    line-height: 3.6rem;

    margin-bottom: 2.4rem;
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
  box-shadow: 0px 2px 4px rgba(4, 38, 82, 0.06);

  margin-top: 2.1rem;
`;
