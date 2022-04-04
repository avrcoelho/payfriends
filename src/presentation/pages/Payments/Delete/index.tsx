import { Payment } from '@/entities/Payment';
import { DeletePayment } from '@/useCases/DeletePayment';
import { formatDate } from '@/presentation/utils/formatDate';
import { formatValue } from '@/presentation/utils/formatValue';
import { Container, ButtonsContainer, Button } from './styles';
import { useController } from './useController';

type DeleteProps = {
  deletePayment: typeof DeletePayment.prototype['execute'];
};

export const Delete = ({ deletePayment }: DeleteProps): JSX.Element | null => {
  const { isLoading, onDelete, payment, onCloseModal } = useController({
    deletePayment,
  });

  if (!payment) {
    return null;
  }

  return (
    <Container>
      <h3>Excluir pagamento</h3>

      <p>Usuário: {payment?.user.name}</p>
      <p>Data: {formatDate(payment?.date)}</p>
      <p>Valor: {formatValue(payment?.value)}</p>

      <ButtonsContainer>
        <Button className="cancel" onClick={onCloseModal} disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={() => onDelete(payment?.id)} isLoading={isLoading}>
          Excluir
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
