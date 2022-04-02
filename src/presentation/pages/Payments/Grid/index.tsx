import { Payment } from '@/entities/Payment';
import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { GridItem } from './Item';
import { Container, Row, Column } from './styles';
import { useController } from './useController';

type GridPropd = {
  payments: Payment[];
  updatePaymentStatus: typeof UpdatePaymentStatus.prototype['execute'];
};

export const Grid = ({
  payments,
  updatePaymentStatus,
}: GridPropd): JSX.Element => {
  const { onUpdateStatus } = useController({ updatePaymentStatus });

  return (
    <Container>
      <Row $isHeader>
        <Column>Usuário</Column>
        <Column>Titulo</Column>
        <Column>Data</Column>
        <Column>Valor</Column>
        <Column>Pago</Column>
        <Column></Column>
      </Row>

      {payments.map(payment => (
        <GridItem
          key={payment.id}
          onUpdateStatus={onUpdateStatus}
          payment={payment}
        />
      ))}
    </Container>
  );
};
