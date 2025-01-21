<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  items: any[];
  itemSize: number;
  buffer: number;
}>();

const startIndex = ref(0);

const pool = computed(() => {
  return props.items.slice(startIndex.value, startIndex.value + props.buffer);
});

const computedTotalHeight = computed(() => {
  return props.items.length * props.itemSize;
});

const computedTop = computed(() => {
  return startIndex.value * props.itemSize;
});

function handleScroll(e: Event) {
  const target = e.target as HTMLElement
  if (target) {
    startIndex.value = target.scrollTop / props.itemSize;
  }
}
</script>

<template>
  <div class="recycle-scroller" @scroll="handleScroll">
    <div :style="{ height: `${computedTotalHeight}px` }">
      <div :style="{ transform: `translateY(${computedTop}px)` }">
        <template v-for="item in pool">
          <slot :item="item" />
        </template>
      </div>
    </div>
  </div>
</template>
