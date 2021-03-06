import { renderHook } from '@testing-library/react-hooks';
import * as Yup from 'yup';

import { InputMessages } from '../../constants/InputMessages';
import { useYupValidationResolver } from '../useYupValidationResolver';

describe('useYupValidationResolver hook', () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(InputMessages.InvalidEmail)
      .required(InputMessages.RequiredField),
  });

  it('should be able to return yup errors', async () => {
    const { result } = renderHook(() =>
      useYupValidationResolver(validationSchema),
    );

    const response = await result.current({});

    expect(response.errors).toHaveProperty('email');
  });

  it('should not be able to return errors', async () => {
    const { result } = renderHook(() =>
      useYupValidationResolver(validationSchema),
    );

    const response = await result.current({ email: 'john@doe.com' });

    expect(response.errors).toEqual({});
  });

  it('should be able to return outhers errors', async () => {
    const { result } = renderHook(() =>
      useYupValidationResolver({} as Yup.ObjectSchema<any>),
    );

    const response = await result.current({ email: 'john@doe.com' });

    expect(response.values).toEqual({});
  });
});
