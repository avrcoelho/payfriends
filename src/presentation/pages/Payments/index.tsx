import { GetUser } from '@/useCases/GetUser';
import { GetPayments } from '@/useCases/GetPayments';
import { Header } from '@/presentation/components/Header';
import { useController } from './useController';
import {
  Container,
  Content,
  Title,
  ButtonAddPayment,
  PaymentsGrid,
} from './styles';
import { Controls } from './Controls';
import { Grid } from './Grid';

type PaymentsProps = {
  getUser: () => GetUser;
  getPayments: () => GetPayments;
};

export const Payments = ({
  getPayments,
  getUser,
}: PaymentsProps): JSX.Element => {
  const { user, onUpdateLimit, onUpdatePage, page, limit, paymentsData } =
    useController({
      getPayments,
      getUser,
    });

  return (
    <>
      {!!user && <Header user={user} />}
      <Container>
        <Content>
          {!!paymentsData && (
            <>
              <Title>Meus pagamentos</Title>
              <ButtonAddPayment type="button">
                Adicionar pagamento
              </ButtonAddPayment>

              <PaymentsGrid>
                <Controls
                  limit={limit}
                  page={page}
                  total={paymentsData.total}
                  onUpdateLimit={onUpdateLimit}
                  onUpdatePage={onUpdatePage}
                />

                <Grid payments={paymentsData.data} />
              </PaymentsGrid>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};
