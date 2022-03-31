import styled from 'styled-components';
import Modal from 'react-modal';

import { Colors } from '../../constants/Colors';

const modalStyles: Modal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
  content: {
    marginTop: '6.4rem',
    marginBottom: '4rem',
    height: 'max-content',
  },
};

export const Container = styled(Modal).attrs({
  style: modalStyles,
})`
  background-color: ${Colors.White};
  box-shadow: 0 10px 16px 0 #666;
  padding: 1.6rem;

  &:focus {
    outline: none;
  }

  .content {
    min-width: 38rem;
    max-width: 80rem;
  }
`;

export const Title = styled.h4`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
  color: ${Colors.Black};
  font-weight: 600;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.2rem;
`;

export const Button = styled.button`
  color: ${Colors.Grey};
  cursor: pointer;
  margin: 0 0 0.8rem auto;
  width: 3rem;
  height: 3rem;
  border: none;
  padding: 0;
  background: transparent;
`;

export const CrossIconContainer = styled.span`
  margin-left: 0.8rem;
  vertical-align: middle;
`;
