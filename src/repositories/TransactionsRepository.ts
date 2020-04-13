import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const reducer: (balance: Balance, transaction: Transaction) => Balance = (
  balance,
  transaction,
) => {
  switch (transaction.type) {
    case 'income':
      return {
        ...balance,
        income: balance.income + transaction.value,
        total: balance.total + transaction.value,
      };
    case 'outcome':
      return {
        ...balance,
        outcome: balance.outcome + transaction.value,
        total: balance.total - transaction.value,
      };
    default:
      break;
  }
  return balance;
};

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(reducer, {
      income: 0,
      outcome: 0,
      total: 0,
    });
  }

  public create({ title, type, value }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
