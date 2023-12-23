// src/stores/index.ts

import { defineStore } from 'pinia';
import type { UserTransaction } from '@/types';

// eslint-disable-next-line import/prefer-default-export
export const useExpenseTrackerStore = defineStore('expenseTracker', {
  state: () => ({
    transactions: [] as UserTransaction[],
  }),
  actions: {
    addTransaction(transactionData: UserTransaction) {
      this.transactions.push(transactionData);
      this.saveTransactionToLocalStorage();
    },
    deleteTransaction(id: number) {
      this.transactions = this.transactions.filter(
        (transaction) => transaction.id !== id
      );
      this.saveTransactionToLocalStorage();
    },
    saveTransactionToLocalStorage() {
      localStorage.setItem(
        'transactions',
        JSON.stringify(this.transactions)
      );
    },
    initializeTransactions() {
      const savedTransactions = JSON.parse(
        localStorage.getItem('transactions') || '[]'
      ) as UserTransaction[];

      if (savedTransactions.length > 0) {
        this.transactions = savedTransactions;
      }
    },
  },
  getters: {
    total(): number {
      return this.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      );
    },
    userIncomes(): string {
      return this.transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
        .toFixed(2);
    },
    userExpenses(): string {
      return this.transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
        .toFixed(2);
    },
  },
});
