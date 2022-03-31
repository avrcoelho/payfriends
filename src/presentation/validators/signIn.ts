import * as yup from 'yup';

import { InputMessages } from '../constants/InputMessages';

export const signInValidator = yup.object({
  email: yup
    .string()
    .email(InputMessages.InvalidEmail)
    .required(InputMessages.RequiredFiel)
    .trim(),
  password: yup.string().required(InputMessages.RequiredFiel),
});
