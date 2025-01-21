<script setup lang="ts">
import { computed, ref, unref } from 'vue';

const props = defineProps<{
  items: any[]
  itemSize: number
  buffer: number
}>();

const startIndex = ref(0);

const pool = computed(() => {
  return props.items.slice(unref(startIndex), unref(startIndex) + props.buffer);
});

function handleScroll(e: any) {
  const target = e.target;
  if (target) {
    startIndex.value = target.scrollTop / props.itemSize;
  }
}

const computedPaddingTop = computed(() => {
  return unref(startIndex) * props.itemSize;
});
const computedPaddingBottom = computed(() => {
  return (props.items.length - unref(props.buffer) - unref(startIndex)) * props.itemSize;
});
</script>

<template>
  <div class="recycle-scroller" @scroll="handleScroll">
    <div :style="{ paddingTop: `${computedPaddingTop}px`, paddingBottom: `${computedPaddingBottom}px` }">
      <slot v-for="item in pool" :item="item" />
    </div>
  </div>
</template>
