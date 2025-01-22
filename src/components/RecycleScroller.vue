<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core';
import { computed, ref } from 'vue';

const { items, itemSize, buffer = 0 } = defineProps<{
  items: any[];
  itemSize: number;
  buffer?: number;
}>();

const startIndex = ref(0);

const pool = computed(() => {
  return items.slice(startIndex.value, startIndex.value + buffer);
});

const computedPadding = computed(() => {
  return {
    top: startIndex.value * itemSize,
    bottom: Math.max((items.length - buffer - startIndex.value), 0) * itemSize,
  };
});

function handleScroll(e: Event) {
  const target = e.target as HTMLElement;
  if (target) {
    startIndex.value = Math.floor(target.scrollTop / itemSize);
  }
}
const throttledHandleScroll = useThrottleFn(handleScroll, 200, true);
</script>

<template>
  <div class="recycle-scroller" @scroll.passive="throttledHandleScroll">
    <div :style="{ paddingTop: `${computedPadding.top}px`, paddingBottom: `${computedPadding.bottom}px` }">
      <slot v-for="item in pool" :item="item" />
    </div>
  </div>
</template>
