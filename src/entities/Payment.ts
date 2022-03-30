import { User } from './User';

export interface Payment {
  id: string;
  user: User;
  value: number;
  timestamp: number;
  status: boolean;
}
