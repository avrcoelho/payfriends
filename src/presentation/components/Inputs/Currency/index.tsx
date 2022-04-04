import { UseFormRegisterReturn } from 'react-hook-form';

import { Colors } from '@/presentation/constants/Colors';
import { Container, InputContainer, ErrorText, Label } from '../Text/styles';
import { Input } from './styles';

type InputTextProps = {
  maskChar?: null;
  register?: UseFormRegisterReturn | {};
  error?: string;
  label?: string;
  parentBgColor?: string;
  className?: string;
  name: string;
};

export const InputCurrency = ({
  register = {},
  error,
  label,
  parentBgColor = Colors.LightGrey1,
  className = '',
  name,
}: InputTextProps): JSX.Element => {
  return (
    <Container className={className}>
      <InputContainer $hasError={!!error}>
        <Input
          name="name"
          decimalSeparator=","
          thousandSeparator="."
          placeholder=" "
          {...register}
        />
        {!!label && (
          <Label htmlFor={name} $parentBgColor={parentBgColor}>
            {label}
          </Label>
        )}
      </InputContainer>

      {!!error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
