import styled, { css } from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  & + div {
    margin-top: 3.6rem;
  }
`;

type InputContainerProps = {
  $hasError: boolean;
};

const errorStyle = css`
  border-color: ${Colors.Red};
`;

export const InputContainer = styled.div<InputContainerProps>`
  width: 100%;
  height: 5.4rem;
  padding: 0 1.5rem;
  border: 0.2rem ${Colors.LightGrey2} solid;
  background-color: transparent;
  border-radius: 0.4rem;

  display: flex;
  align-items: center;

  ${({ $hasError }) => $hasError && errorStyle}
`;

type LabelProps = {
  $parentBgColor: string;
};

export const Label = styled.label<LabelProps>`
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.6);

  position: absolute;

  top: -0.7rem;
  left: 1.5rem;

  padding: 0 0.3rem;
  background-color: ${({ $parentBgColor }) => $parentBgColor};
`;

export const Input = styled.input`
  height: 100%;
  width: inherit;
  color: ${Colors.Black};
  font-size: 1.6rem;
  border: none;
  font-weight: 400;
  outline: none;
  background: transparent;

  ::placeholder {
    color: ${Colors.Grey};
  }
`;

export const ErrorText = styled.small`
  font-size: 1.2rem;
  color: ${Colors.Red};
  margin-top: 0.2rem;
`;

export const ButtonTogglePassword = styled.button`
  border: none;
  background: transparent;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;
