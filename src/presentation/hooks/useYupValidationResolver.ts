import { useCallback } from 'react';
import {
  FieldValues,
  ResolverError,
  ResolverSuccess,
  UnpackNestedValue,
} from 'react-hook-form';
import * as Yup from 'yup';

import validationYupErrorsMapper from '../utils/validationYupErrors';

type Return<TData> = (
  data: TData,
) => Promise<ResolverSuccess<TData> | ResolverError<FieldValues>>;

export const useYupValidationResolver = <TData = unknown>(
  validationSchema: Yup.ObjectSchema<any>,
): Return<TData> =>
  useCallback(
    async (data: TData): Promise<ResolverSuccess<TData> | ResolverError> => {
      try {
        const values = (await validationSchema.validate(data, {
          abortEarly: false,
        })) as UnpackNestedValue<TData>;

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        let parsedErrors = errors;
        if (errors instanceof Yup.ValidationError) {
          parsedErrors = validationYupErrorsMapper(errors);
        }

        return {
          values: {},
          errors: parsedErrors,
        };
      }
    },
    [validationSchema],
  );
