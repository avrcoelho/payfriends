import * as yup from 'yup';

import { InputMessages } from '../constants/InputMessages';

export const paymentValidator = yup.object({
  title: yup.string().required(InputMessages.RequiredField),
  value: yup.string().required(InputMessages.RequiredField),
  userId: yup.string().required(InputMessages.RequiredField),
  date: yup
    .string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/,
      InputMessages.InvalidDate,
    )
    .required(InputMessages.RequiredField),
});
