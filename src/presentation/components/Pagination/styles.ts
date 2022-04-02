import styled, { css } from 'styled-components';
import { Colors } from '../../constants/Colors';
import { ButtonDefault } from '../Buttons/Default';

export const Container = styled.div`
  display: flex;
  align-items: center;

  padding-right: 5rem;
`;

type ButtonProps = {
  $isCurrent?: boolean;
};

const currentButtonStyle = css`
  background: transparent;
  color: ${Colors.SecondaryText};
`;

export const Button = styled(ButtonDefault)<ButtonProps>`
  height: 2.3rem;
  width: auto;

  border-radius: 0.6rem;

  font-size: 1.2rem;
  line-height: 1.4rem;

  padding: 0 0.8rem;

  & + button {
    margin-left: 0.2rem;
  }

  ${({ $isCurrent }) => !$isCurrent && currentButtonStyle}
`;
