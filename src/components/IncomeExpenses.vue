<!-- src/components/IncomeExpenses.vue -->

<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">€{{ incomes }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">€{{ expenses }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  incomes: {
    type: String,
    required: true
  },
  expenses: {
    type: String,
    required: true
  }
})
</script>
