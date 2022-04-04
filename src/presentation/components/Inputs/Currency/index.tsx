import { UseFormRegisterReturn } from 'react-hook-form';

import { Colors } from '@/presentation/constants/Colors';
import { Container, InputContainer, ErrorText, Label } from '../Text/styles';
import { Input } from './styles';
import { InputHTMLAttributes } from 'react';

type InputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  maskChar?: null;
  register?: UseFormRegisterReturn | {};
  error?: string;
  label?: string;
  parentBgColor?: string;
  className?: string;
};

export const InputCurrency = ({
  register = {},
  error,
  label,
  parentBgColor = Colors.LightGrey1,
  className = '',
  ...restInpuProps
}: InputTextProps): JSX.Element => {
  return (
    <Container className={className}>
      <InputContainer $hasError={!!error}>
        <Input
          decimalSeparator=","
          thousandSeparator="."
          placeholder=" "
          {...register}
          {...restInpuProps}
        />
        {!!label && (
          <Label htmlFor={restInpuProps.name} $parentBgColor={parentBgColor}>
            {label}
          </Label>
        )}
      </InputContainer>

      {!!error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
