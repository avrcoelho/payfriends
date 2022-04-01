import { GetUser } from '@/useCases/GetUser';
import { GetPayments } from '@/useCases/GetPayments';
import { Header } from '@/presentation/components/Header';
import { useController } from './useController';

type PaymentsProps = {
  getUser: () => GetUser;
  getPayments: () => GetPayments;
};

export const Payments = ({
  getPayments,
  getUser,
}: PaymentsProps): JSX.Element => {
  const { user } = useController({ getPayments, getUser });

  return <>{!!user && <Header user={user} />}</>;
};
