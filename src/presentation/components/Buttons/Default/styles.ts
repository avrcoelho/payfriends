import styled, { css, keyframes } from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

type ContainerProps = {
  $isLoading: boolean;
  disabled?: boolean;
};

const isLoadingStyle = css`
  opacity: 0.7;
  cursor: default;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.button<ContainerProps>`
  width: 100%;
  height: 3.6rem;

  display: flex;

  align-items: center;
  justify-content: center;

  background-color: ${Colors.Blue};
  border-radius: 0.4rem;

  font-size: 1.4rem;
  color: ${Colors.White};
  font-size: 1.4rem;
  line-height: 1.6rem;
  text-align: center;
  letter-spacing: 0.125px;
  text-transform: uppercase;

  ${({ $isLoading, disabled = false }) =>
    ($isLoading || disabled) && isLoadingStyle};

  .loader {
    animation: ${spinAnimation} 2s linear infinite;
  }
`;
