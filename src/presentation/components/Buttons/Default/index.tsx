import { ButtonHTMLAttributes } from 'react';
import { ImSpinner8 } from 'react-icons/im';

import { Colors } from '../../../constants/Colors';
import { Container } from './styles';

interface ButtonDefaultProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: string;
}

export const ButtonDefault = ({
  isLoading = false,
  children,
  ...restProps
}: ButtonDefaultProps): JSX.Element => {
  return (
    <Container type="button" {...restProps} $isLoading={isLoading}>
      {isLoading ? (
        <ImSpinner8
          color={Colors.White}
          size={16}
          className="loader"
          aria-label="Loading..."
        />
      ) : (
        children
      )}
    </Container>
  );
};
