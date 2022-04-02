import { Payment } from '@/entities/Payment';
import { User } from '../../entities/User';

export type GetParams = {
  userId: string;
  page: number;
  limit: number;
};

export type CreateParams = Omit<Payment, 'id' | 'user'> & {
  userId: string;
};

export type UpdateParams = Omit<Payment, 'user'> & {
  userId: string;
};

export type UpdateStatusParams = {
  id: string;
  status: boolean;
};

export type PaymentData = {
  data: Payment[];
  total: number;
};

export interface PaymentGatewayPort {
  get(params: GetParams): Promise<PaymentData>;
  getById(id: string): Promise<Payment>;
  create(params: CreateParams): Promise<Payment>;
  update(params: UpdateParams): Promise<Payment>;
  updateStatus(params: UpdateStatusParams): Promise<Payment>;
  deleteById(id: string): Promise<void>;
}
