<!-- src/components/AddTransaction.vue -->

<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input type="text" id="text" placeholder="Enter text..." v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount"
        >Amount <br />
        (negative - expense, positive - income)</label
      >
      <input type="text" id="amount" placeholder="Enter amount..." v-model="amount" />
    </div>
    <button type="submit" class="btn">Add transaction</button>
  </form>
</template>

<script setup lang="ts">

import type { UserTransaction } from '@/types';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useExpenseTrackerStore } from '@/stores';

const toast = useToast();
const expenseTracker = useExpenseTrackerStore();

const text = ref('');
const amount = ref('');

const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error('you have to fill text and amount fields.');
    return;
  }

   // Regular expression to match positive or negative float numbers
 const floatRegex = /^-?\d+(\.\d+)?$/;

 if (!floatRegex.test(amount.value)) {
   toast.error('Amount must be a valid number.');
   return;
 }

  const transactionData: UserTransaction = {
    id: Math.floor(Math.random() * 100000000),
    text: text.value,
    amount: parseFloat(amount.value),
  };

  expenseTracker.addTransaction(transactionData);
  toast.success('Transaction added successfully.');

  text.value = '';
  amount.value = '';
};
</script>
