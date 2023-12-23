  import { createPinia } from 'pinia';
  import { createApp } from 'vue';
  import { useExpenseTrackerStore } from '@/stores/index';
  import { describe, it, expect, beforeEach} from "vitest";

  describe('expenseTrackerStore', () => {
    let store;
    let app;

    beforeEach(() => {
      const pinia = createPinia();
      app = createApp({});
      app.use(pinia);
      store = useExpenseTrackerStore();
    });

    it('should calculate total correctly', () => {
      store.transactions = [
        { id: 1, amount: 10 },
        { id: 2, amount: 20 },
        { id: 3, amount: 30 },
        { id: 4, amount: -20 }
      ];
      expect(store.total).toBe(40);
    });

    it('should calculate userIncomes correctly', () => {
      store.transactions = [
        { id: 1, amount: 10 },
        { id: 2, amount: -20 },
        { id: 3, amount: 30 },
      ];
      expect(store.userIncomes).toBe('40.00');
    });

    it('should calculate userExpenses correctly', () => {
      store.transactions = [
        { id: 1, amount: 10 },
        { id: 2, amount: -20 },
        { id: 3, amount: 30 },
      ];
      expect(store.userExpenses).toBe('-20.00');
    });
  });
