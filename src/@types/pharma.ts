export interface recentCustomer {
  name: string;
  email: string;
  spent: number;
  photo?: string;
  address?: string;
  phone?: string;
  register_date?: string;
}

export interface incomeExpens {
  type: string;
  name: string;
  amount: number;
}
