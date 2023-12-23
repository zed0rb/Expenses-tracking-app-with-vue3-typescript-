<!-- src/components/UserBalance.vue -->

<template>
  <h4>Your Balance</h4>
  <h1 id="balance">€{{ total }}</h1>
</template>

<script setup lang="ts">

defineProps({
  total: {
    type: Number,
    required: true
  }
})


</script>
