import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Container } from './styles';

type InputChackboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  register?: UseFormRegisterReturn | {};
};

export const InputChackbox = ({
  register = {},
  ...restInputProps
}: InputChackboxProps): JSX.Element => {
  return (
    <Container aria-label="Status do pagamento">
      <input type="checkbox" {...register} {...restInputProps} />
      <span className="checkmark"></span>
    </Container>
  );
};
