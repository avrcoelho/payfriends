import { Payments } from '@/presentation/pages/Payments';
import { makeGetUser } from '../useCases/getUser';
import { makeGetPayments } from '../useCases/getPayments';

export const MakePayments = (): JSX.Element => {
  return <Payments getPayments={makeGetPayments} getUser={makeGetUser} />;
};
