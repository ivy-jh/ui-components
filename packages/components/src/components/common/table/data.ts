export type Payment = {
  id: string;
  amount?: number;
  status?: 'pending' | 'processing' | 'success' | 'failed';
  email?: string;
};

export const tableData: Payment[] = [
  {
    id: 'INV001',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com'
  },
  {
    id: 'INV002',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com'
  },
  {
    id: 'INV003',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com'
  },
  {
    id: 'INV004',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com'
  },
  {
    id: 'INV005',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com'
  },
  {
    id: 'INV006',
    amount: 200,
    status: 'pending',
    email: 'lukas@axonivy.com'
  },
  {
    id: 'INV007',
    amount: 300,
    status: 'processing',
    email: 'hans@example.com'
  },
  {
    id: 'empty',
    amount: undefined,
    status: undefined,
    email: undefined
  }
];
