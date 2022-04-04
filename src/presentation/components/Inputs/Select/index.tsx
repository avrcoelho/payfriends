import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Colors } from '@/presentation/constants/Colors';
import { SelectOption } from '@/presentation/types/SelectOption';
import { Container, InputContainer, ErrorText, Label } from '../Text/styles';
import { Select } from './styles';

type InputSelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  register?: UseFormRegisterReturn | {};
  error?: string;
  label?: string;
  parentBgColor?: string;
  options: SelectOption[];
  className?: string;
  selectedValue?: string | number;
};

export const InputSelect = ({
  register = {},
  error,
  label,
  parentBgColor = Colors.LightGrey1,
  options,
  className = '',
  ...restInputProps
}: InputSelectProps): JSX.Element => {
  return (
    <Container className={className}>
      <InputContainer $hasError={!!error}>
        <Select {...register} {...restInputProps}>
          {options.map(option => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </Select>
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
