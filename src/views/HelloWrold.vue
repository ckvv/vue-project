<script setup lang="ts">
import { onBeforeUpdate, onUpdated, ref } from 'vue';

const count = ref(0);
onBeforeUpdate(() => {
  console.log('onBeforeUpdate: pa');
});
onUpdated(() => {
  console.log('onUpdated: pa');
});
</script>

<template>
  <Test :count="count" />
  <button @click="count++">
    Add
  </button>
</template>
