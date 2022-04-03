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

  &:focus {
    outline: none;
  }
`;
