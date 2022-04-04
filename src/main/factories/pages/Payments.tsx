import { Payments } from '@/presentation/pages/Payments';
import { makeGetUser } from '../useCases/getUser';
import { makeGetPayments } from '../useCases/getPayments';
import { makeUpdatePaymentStatus } from '../useCases/updatePaymentStatus';
import { makeDeletePayment } from '../useCases/deletePayment';
import { makeSignOut } from '../useCases/signOut';
import { makeGetUsers } from '../useCases/getUsers';
import { makeCreatePayment } from '../useCases/createPayment';
import { makeUpdatePayment } from '../useCases/updatePayment';

export const MakePayments = (): JSX.Element => {
  return (
    <Payments
      getPayments={makeGetPayments}
      getUser={makeGetUser}
      updatePaymentStatus={makeUpdatePaymentStatus}
      deletePayment={makeDeletePayment}
      signOut={makeSignOut}
      getUsers={makeGetUsers}
      createPayment={makeCreatePayment}
      updatePayment={makeUpdatePayment}
    />
  );
};
