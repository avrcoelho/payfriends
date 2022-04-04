import { InputHTMLAttributes } from 'react';
import * as Feather from 'react-icons/fi';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Props } from 'react-input-mask';

import { Colors } from '@/presentation/constants/Colors';
import { Container, InputContainer, ErrorText, Label } from '../Text/styles';
import { Input } from './styles';

type InputTextProps = Props & {
  mask: string;
  maskChar?: null;
  register?: UseFormRegisterReturn | {};
  error?: string;
  label?: string;
  parentBgColor?: string;
  className?: string;
};

export const InputMask = ({
  register = {},
  error,
  label,
  parentBgColor = Colors.LightGrey1,
  className = '',
  mask,
  ...restInputProps
}: InputTextProps): JSX.Element => {
  return (
    <Container className={className}>
      <InputContainer $hasError={!!error}>
        <Input mask={mask} placeholder=" " {...register} {...restInputProps} />
        {!!label && (
          <Label htmlFor={restInputProps.name} $parentBgColor={parentBgColor}>
            {label}
          </Label>
        )}
      </InputContainer>

      {!!error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
