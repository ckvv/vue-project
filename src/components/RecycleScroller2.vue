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

const computedTotalHeight = computed(() => {
  return items.length * itemSize;
});

const computedTop = computed(() => {
  return startIndex.value * itemSize;
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
    <div :style="{ height: `${computedTotalHeight}px` }">
      <div :style="{ transform: `translateY(${computedTop}px)` }">
        <template v-for="item in pool">
          <slot :item="item" />
        </template>
      </div>
    </div>
  </div>
</template>
