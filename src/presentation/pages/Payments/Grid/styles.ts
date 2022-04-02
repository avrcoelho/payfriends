import styled, { css } from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

export const Container = styled.div`
  width: 100%;
`;

type RowProps = {
  $isHeader?: boolean;
};

const headerCss = css`
  padding: 1.2rem 1.75rem;

  font-weight: bold;

  border-bottom: solid 2px ${Colors.Border};

  @media (max-width: 1070px) {
    display: none;
  }
`;

export const Row = styled.div<RowProps>`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;

  font-family: 'Lato';
  font-size: 1.4rem;
  line-height: 1.7rem;

  padding: 1.6rem 3rem 2.4rem 1.2rem;

  &:nth-child(2n + 3) {
    background-color: ${Colors.ZebraStriping};
  }

  ${({ $isHeader }) => $isHeader && headerCss};

  @media (max-width: 1070px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span,
  small {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    color: ${Colors.SecondaryText};
    font-size: 1.2rem;
    line-height: 2rem;

    margin-top: 0.4rem;
  }
`;
