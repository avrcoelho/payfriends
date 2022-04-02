import styled from 'styled-components';

export const ButtonController = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Button = styled.button`
  padding: 0;

  font-size: 0;

  & + button {
    margin-left: 2rem;
  }
`;
