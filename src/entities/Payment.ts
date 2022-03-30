export interface Payment {
  id: string;
  user: {
    id: string;
    name: string;
    nickename: string;
  };
  value: number;
  timestamp: number;
  status: boolean;
}
