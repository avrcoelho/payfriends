import { Payment } from '@/entities/Payment';
import { CreatePayment } from '@/useCases/CreatePayment';
import { UpdatePayment } from '@/useCases/updatePayment';
import { Container, ButtonsContainer, InputsContainer, Button } from './styles';
import { useController } from './useController';

type CreateOrUpdateProps = {
  deletePayment: typeof DeletePayment.prototype['execute'];
};

export const CreateOrUpdate = ({ createPayment, updatePayment }: AddOrUpdateProps): JSX.Element | null => {
  const { isLoading, onDelete, payment, onCloseModal } = useController({
    createPayment, updatePayment
  });

  return (
    <Container>
      <h3>Excluir pagamento</h3>

      <p>Usuário: {payment?.user.name}</p>
      <p>Data: {formatDate(payment?.timestamp)}</p>
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
