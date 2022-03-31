import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Colors } from '@/presentation/constants/Colors';
import { Container, InputContainer, ErrorText, Label } from '../Text/styles';
import { Select } from './styles';

type SelectOption = {
  value: string | number;
  label: string | number;
};

type InputSelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  register?: UseFormRegisterReturn;
  error?: string;
  label: string;
  parentBgColor?: string;
  options: SelectOption[];
};

export const InputSelect = ({
  register,
  error,
  label,
  parentBgColor = Colors.LightGrey1,
  options,
  ...restInputProps
}: InputSelectProps): JSX.Element => {
  return (
    <Container>
      <Label $parentBgColor={parentBgColor}>{label}</Label>
      <InputContainer $hasError={!!error}>
        <Select {...register} {...restInputProps}>
          <option value=""></option>
          {options.map(option => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </Select>
      </InputContainer>

      {!!error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};