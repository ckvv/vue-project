<script setup lang="ts">
const color = defineModel<string>('model-value');
</script>

<template>
  <div class="inline-block h-10 w-10 flex-shrink-0" :style="{ backgroundColor: color }" :title="color" />
</template>
