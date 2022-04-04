import { User } from './User';

export interface Payment {
  id: string;
  title: string;
  userId: string;
  user: User;
  value: number;
  date: string;
  status: boolean;
}
