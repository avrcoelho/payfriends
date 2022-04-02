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
`;

export const Row = styled.div<RowProps>`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  font-family: 'Lato';
  font-size: 1.4rem;
  line-height: 1.7rem;

  padding: 1.6rem 1.2rem 2.4rem;

  &:nth-child(2n + 3) {
    background-color: ${Colors.ZebraStriping};
  }

  ${({ $isHeader }) => $isHeader && headerCss};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  small {
    color: ${Colors.SecondaryText};
    font-size: 1.2rem;
    line-height: 2rem;

    margin-top: 0.4rem;
  }
`;
