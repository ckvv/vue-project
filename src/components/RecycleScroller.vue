<script setup lang="ts">
import { computed, ref, unref } from 'vue';

const props = defineProps<{
  items: any[]
  itemSize: number
  buffer: number
}>();

const wrapRef = ref<HTMLElement>();
const startIndex = ref(0);

const pool = computed(() => {
  return props.items.slice(unref(startIndex), unref(startIndex) + props.buffer);
});

function handleScroll() {
  const wrapper = wrapRef.value;
  if (wrapper) {
    startIndex.value = wrapper.scrollTop / props.itemSize;
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
  <div ref="wrapRef" @scroll="handleScroll">
    <div :style="{ paddingTop: `${computedPaddingTop}px`, paddingBottom: `${computedPaddingBottom}px` }">
      <slot v-for="item in pool" :item="item" />
    </div>
  </div>
</template>
