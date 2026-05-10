export interface RecentCustomer {
  name: string;
  email: string;
  spent: number;
  photo?: string;
  address?: string;
  phone?: string;
  register_date?: string;
}

export interface IncomeExpenseType {
  type: string;
  name: string;
  amount: number;
}
