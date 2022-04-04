import { memo } from 'react';
import { FiEdit2, FiXCircle } from 'react-icons/fi';

import { Payment } from '@/entities/Payment';
import { formatDate } from '@/presentation/utils/formatDate';
import { formatHour } from '@/presentation/utils/formatHour';
import { formatValue } from '@/presentation/utils/formatValue';
import { InputChackbox } from '@/presentation/components/Inputs/Checkbox';
import { UpdateStatusParams } from '@/useCases/ports/paymentGateway';
import { Colors } from '@/presentation/constants/Colors';
import { Column, Row } from '../styles';
import { Button, ButtonController } from './styles';

type ComponentProps = {
  onUpdateStatus(params: UpdateStatusParams): void;
  onDelete(paymentId: string): void;
  onUpdate(paymentId: string): void;
  payment: Payment;
};

const Component = ({
  onUpdateStatus,
  payment,
  onDelete,
  onUpdate,
}: ComponentProps): JSX.Element => {
  const valueFormated = formatValue(payment.value);

  return (
    <Row>
      <Column>
        <span>{payment.user.name}</span>
        <small>{payment.user.nickname}</small>
      </Column>
      <Column>
        <span title={payment.title}>{payment.title}</span>
      </Column>
      <Column>
        <span>{formatDate(payment.date)}</span>
        <small>{formatHour(payment.date)}</small>
      </Column>
      <Column>
        <span title={valueFormated}>{valueFormated}</span>
      </Column>
      <Column>
        <InputChackbox
          onChange={() => onUpdateStatus(payment)}
          checked={payment.status ?? false}
        />
      </Column>
      <Column>
        <ButtonController>
          <Button
            onClick={() => onUpdate(payment.id)}
            aria-label="Editar"
            title="Editar"
          >
            <FiEdit2 size={20} color={Colors.GrayScale} />
          </Button>
          <Button
            onClick={() => onDelete(payment.id)}
            aria-label="Excluir"
            title="Excluir"
          >
            <FiXCircle size={20} color={Colors.GrayScale} />
          </Button>
        </ButtonController>
      </Column>
    </Row>
  );
};

export const GridItem = memo(Component);
