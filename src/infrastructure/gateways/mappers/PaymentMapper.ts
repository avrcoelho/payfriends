import { CreateParams, UpdateParams } from '@/useCases/ports/paymentGateway';

export class PaymentMapper {
  static toDto(payment: CreateParams | UpdateParams) {
    return {
      ...payment,
      value: Number(String(payment.value).replace(',', '.').replace('.', '')),
      date: payment.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'),
    };
  }
}
