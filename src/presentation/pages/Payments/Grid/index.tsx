import { Payment } from '@/entities/Payment';
import { GridItem } from './Item';
import { Container, Row, Column } from './styles';

type GridPropd = {
  payments: Payment[];
};

export const Grid = ({ payments }: GridPropd): JSX.Element => {
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
        <GridItem key={payment.id} {...payment} />
      ))}
    </Container>
  );
};
