<!-- src/App.vue -->

<template>
  <AppHeader />
  <div class="container">
    <UserBalance :total="expenseTracker.total" />
    <IncomeExpenses
      :incomes="`${expenseTracker.userIncomes}`"
      :expenses="`${expenseTracker.userExpenses}`"
    />
    <TransactionList
      :transactions="expenseTracker.transactions"
      @transactionDeleted="expenseTracker.deleteTransaction"
    />
    <AddTransaction @transactionSubmitted="expenseTracker.addTransaction" />
  </div>
</template>

<script setup lang="ts">

import  { onMounted } from "vue";

import AppHeader from '@/components/AppHeader.vue';
import UserBalance from '@/components/UserBalance.vue';
import IncomeExpenses from '@/components/IncomeExpenses.vue';
import TransactionList from '@/components/TransactionList.vue';
import AddTransaction from '@/components/AddTransaction.vue';
import { useExpenseTrackerStore } from '@/stores';

const expenseTracker = useExpenseTrackerStore();

onMounted(() => {
  expenseTracker.initializeTransactions();
});
</script>
