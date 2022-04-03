import * as yup from 'yup';

import { InputMessages } from '../constants/InputMessages';

export const paymentValidator = yup.object({
  title: yup.string().required(InputMessages.RequiredField),
  value: yup.number().required(InputMessages.RequiredField),
  userId: yup.string().required(InputMessages.RequiredField),
  date: yup.string().required(InputMessages.RequiredField),
});
