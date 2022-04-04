import { GetUser } from '@/useCases/GetUser';
import { GetPayments } from '@/useCases/GetPayments';
import { DeletePayment } from '@/useCases/DeletePayment';
import { Header } from '@/presentation/components/Header';
import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { Modal } from '@/presentation/components/Modal';
import { SignOut } from '@/useCases/SignOut';
import { GetUsers } from '@/useCases/GetUsers';
import { UpdatePayment } from '@/useCases/updatePayment';
import { CreatePayment } from '@/useCases/CreatePayment';
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
import { CreateOrUpdate } from './CreateOrUpdate';

type PaymentsProps = {
  getUser(): GetUser;
  getUsers(): GetUsers;
  getPayments(): GetPayments;
  signOut(): SignOut;
  updatePaymentStatus: typeof UpdatePaymentStatus.prototype['execute'];
  updatePayment: typeof UpdatePayment.prototype['execute'];
  createPayment: typeof CreatePayment.prototype['execute'];
  deletePayment: typeof DeletePayment.prototype['execute'];
};

export const Payments = ({
  getPayments,
  getUser,
  updatePaymentStatus,
  deletePayment,
  signOut,
  createPayment,
  getUsers,
  updatePayment,
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
    onOpenModalToCreate,
    search,
    onSetSearch,
  } = useController({
    getPayments,
    getUser,
  });

  return (
    <>
      {!!user && <Header user={user} signOut={signOut} />}
      <Container>
        <Content>
          {hasPaymentsData && !!paymentsData && (
            <>
              <Title>Meus pagamentos</Title>
              <ButtonAddPayment type="button" onClick={onOpenModalToCreate}>
                Adicionar pagamento
              </ButtonAddPayment>

              <PaymentsGrid>
                <Controls
                  limit={limit}
                  page={page}
                  total={paymentsData.total}
                  search={search}
                  onUpdateLimit={onUpdateLimit}
                  onUpdatePage={onUpdatePage}
                  onSetSearch={onSetSearch}
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
        {['create', 'update'].includes(modalType as string) && (
          <CreateOrUpdate
            createPayment={createPayment}
            updatePayment={updatePayment}
            getUsers={getUsers}
          />
        )}
      </Modal>
    </>
  );
};
