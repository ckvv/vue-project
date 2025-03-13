<script setup lang="ts">
defineProps<{
  data: string[];
}>();
</script>

<template>
  <div class="flex gap-1">
    <ColorItem v-for="color in data" :key="color" :model-value="color" class="flex gap-1" />
  </div>
</template>
