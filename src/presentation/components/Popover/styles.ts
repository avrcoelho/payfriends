import styled from 'styled-components';

import { Colors } from '@/presentation/constants/Colors';

interface ContainerProps {
  $width?: string;
  $isVisible: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  > span {
    min-width: ${({ $width }) => $width || ' 0.6rem'};
    padding: 1rem 1.6rem;
    border-radius: 4px;
    font-size: 1.3rem;
    font-weight: 500;
    transition: opacity 0.4s;
    position: absolute;
    top: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%);
    color: ${Colors.Black};
    text-transform: none;
    line-height: 17px;
    background: ${Colors.White};
    border-radius: 0.4rem;
    border: solid 1px ${Colors.LightGrey1};
    box-shadow: 0px 10px 20px 0px hsla(0, 0%, 0%, 0.08);
    font-size: 1.3rem;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
    z-index: 2;

    &::before {
      content: '';
      margin: auto;
      position: absolute;
      display: block;
      left: 0;
      right: 0;
      bottom: calc(100% - 5px);
      width: 1rem;
      height: 1rem;
      transform: rotate(45deg);
      border: 1px solid;
      border-color: ${Colors.LightGrey1} transparent transparent
        ${Colors.LightGrey1};
      background-color: ${Colors.White};
    }
  }
`;
