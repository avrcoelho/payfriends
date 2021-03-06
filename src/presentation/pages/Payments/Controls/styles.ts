import styled from 'styled-components';

import { InputText } from '@/presentation/components/Inputs/Text';

export const Container = styled.div`
  padding: 1.6rem 1.4rem;

  &,
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 940px) {
    flex-direction: column;
    align-items: unset;

    & > :last-child {
      margin-top: 2.4rem;
    }
  }
`;

export const SearchContainer = styled.div`
  width: fit-content;
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

export const PaginationAndLimitContainer = styled.div`
  width: fit-content;
  margin-left: auto;
`;
