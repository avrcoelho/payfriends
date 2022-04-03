import { GetUser } from '@/useCases/GetUser';
import { GetPayments } from '@/useCases/GetPayments';
import { DeletePayment } from '@/useCases/DeletePayment';
import { Header } from '@/presentation/components/Header';
import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { Modal } from '@/presentation/components/Modal';
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
import { Delete } from './Delete';

type PaymentsProps = {
  getUser(): GetUser;
  getPayments(): GetPayments;
  updatePaymentStatus: typeof UpdatePaymentStatus.prototype['execute'];
  deletePayment: typeof DeletePayment.prototype['execute'];
};

export const Payments = ({
  getPayments,
  getUser,
  updatePaymentStatus,
  deletePayment,
}: PaymentsProps): JSX.Element => {
  const {
    user,
    onUpdateLimit,
    onUpdatePage,
    page,
    limit,
    paymentsData,
    hasPaymentsData,
    modalType,
    modalRef,
  } = useController({
    getPayments,
    getUser,
  });

  return (
    <>
      {!!user && <Header user={user} />}
      <Container>
        <Content>
          {hasPaymentsData && !!paymentsData && (
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

                <Grid
                  payments={paymentsData.data}
                  updatePaymentStatus={updatePaymentStatus}
                />
              </PaymentsGrid>
            </>
          )}
        </Content>
      </Container>

      <Modal ref={modalRef}>
        {modalType === 'delete' && <Delete deletePayment={deletePayment} />}
      </Modal>
    </>
  );
};
