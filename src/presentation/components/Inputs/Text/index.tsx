import { InputHTMLAttributes } from 'react';
import * as Feather from 'react-icons/fi';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Colors } from '@/presentation/constants/Colors';
import { useController } from './useController';
import {
  Container,
  InputContainer,
  Input,
  ErrorText,
  ButtonTogglePassword,
  Label,
} from './styles';

type InputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn | {};
  error?: string;
  label?: string;
  parentBgColor?: string;
  className?: string;
};

export const InputText = ({
  register = {},
  error,
  label,
  parentBgColor = Colors.LightGrey1,
  className = '',
  ...restInputProps
}: InputTextProps): JSX.Element => {
  const { passwordIsVisible, togglePasswordVisibility, inputType } =
    useController();
  const isPassword = restInputProps.type === 'password';

  return (
    <Container className={className}>
      {!!label && (
        <Label htmlFor={restInputProps.name} $parentBgColor={parentBgColor}>
          {label}
        </Label>
      )}
      <InputContainer $hasError={!!error}>
        <Input
          {...register}
          {...restInputProps}
          type={isPassword ? inputType : restInputProps.type}
        />

        {isPassword && (
          <ButtonTogglePassword
            type="button"
            onClick={togglePasswordVisibility}
            aria-label="Toggle password"
          >
            {passwordIsVisible ? (
              <Feather.FiEyeOff size={16} color={Colors.Grey} />
            ) : (
              <Feather.FiEye size={16} color={Colors.Grey} />
            )}
          </ButtonTogglePassword>
        )}
      </InputContainer>

      {!!error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
