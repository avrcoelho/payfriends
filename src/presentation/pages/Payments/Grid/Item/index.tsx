import { memo } from 'react';

import { Payment } from '@/entities/Payment';
import { formatDate } from '@/presentation/utils/formatDate';
import { formatHour } from '@/presentation/utils/formatHour';
import { formatValue } from '@/presentation/utils/formatValue';
import { InputChackbox } from '@/presentation/components/Inputs/Checkbox';
import { Column, Row } from '../styles';

const Component = (props: Payment): JSX.Element => {
  return (
    <Row>
      <Column>
        <span>{props.user.name}</span>
        <small>{props.user.nickname}</small>
      </Column>
      <Column>
        <span>{props.title}</span>
      </Column>
      <Column>
        <span>{formatDate(props.timestamp)}</span>
        <small>{formatHour(props.timestamp)}</small>
      </Column>
      <Column>
        <span>{formatValue(props.value)}</span>
      </Column>
      <Column>
        <InputChackbox />
      </Column>
      <Column></Column>
    </Row>
  );
};

export const GridItem = memo(Component);
