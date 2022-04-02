import { memo } from 'react';

import { Payment } from '@/entities/Payment';
import { formatDate } from '@/presentation/utils/formatDate';
import { formatHour } from '@/presentation/utils/formatHour';
import { formatValue } from '@/presentation/utils/formatValue';
import { InputChackbox } from '@/presentation/components/Inputs/Checkbox';
import { UpdateStatusParams } from '@/useCases/ports/paymentGateway';
import { Column, Row } from '../styles';

type ComponentProps = {
  onUpdateStatus(params: UpdateStatusParams): void;
  payment: Payment;
};

const Component = ({
  onUpdateStatus,
  payment,
}: ComponentProps): JSX.Element => {
  return (
    <Row>
      <Column>
        <span>{payment.user.name}</span>
        <small>{payment.user.nickname}</small>
      </Column>
      <Column>
        <span>{payment.title}</span>
      </Column>
      <Column>
        <span>{formatDate(payment.timestamp)}</span>
        <small>{formatHour(payment.timestamp)}</small>
      </Column>
      <Column>
        <span>{formatValue(payment.value)}</span>
      </Column>
      <Column>
        <InputChackbox
          onChange={() => onUpdateStatus(payment)}
          checked={payment.status}
        />
      </Column>
      <Column></Column>
    </Row>
  );
};

export const GridItem = memo(Component);
