import { Payments } from '@/presentation/pages/Payments';
import { makeGetUser } from '../useCases/getUser';
import { makeGetPayments } from '../useCases/getPayments';
import { makeUpdatePaymentStatus } from '../useCases/updatePaymentStatus';
import { makeDeletePayment } from '../useCases/deletePayment';

export const MakePayments = (): JSX.Element => {
  return (
    <Payments
      getPayments={makeGetPayments}
      getUser={makeGetUser}
      updatePaymentStatus={makeUpdatePaymentStatus}
      deletePayment={makeDeletePayment}
    />
  );
};
