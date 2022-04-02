import { GetUser } from '@/useCases/GetUser';
import { GetPayments } from '@/useCases/GetPayments';
import { Header } from '@/presentation/components/Header';
import { useController } from './useController';
import { Container, Content, Title, ButtonAddPayment } from './styles';
import { Pagination } from '../../components/Pagination';

type PaymentsProps = {
  getUser: () => GetUser;
  getPayments: () => GetPayments;
};

export const Payments = ({
  getPayments,
  getUser,
}: PaymentsProps): JSX.Element => {
  const { user } = useController({ getPayments, getUser });

  return (
    <>
      {!!user && <Header user={user} />}
      <Container>
        <Content>
          <Title>Meus pagamentos</Title>
          <ButtonAddPayment type="button">Adicionar pagamento</ButtonAddPayment>

          <Pagination
            amount={52}
            currentPage={2}
            limit={20}
            onUpdatePage={() => {}}
          />
        </Content>
      </Container>
    </>
  );
};
