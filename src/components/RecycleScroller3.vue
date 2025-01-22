<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core';
import { computed, ref, useTemplateRef } from 'vue';

const { items, itemSize = 24, buffer = 0 } = defineProps<{
  items: any[];
  itemSize?: number;
  buffer?: number;
}>();

const contentRef = useTemplateRef('content');
const heightCache = ref(new Map());

function measureHeight() {
  if (!contentRef.value) {
    return;
  }
  for (let i = 0; i < contentRef.value.children.length; i++) {
    const child = contentRef.value.children[i] as HTMLElement;
    const key = child.dataset.key;
    if (!heightCache.value.has(key)) {
      heightCache.value.set(key, child.getBoundingClientRect().height);
    }
  }
}

const startIndex = ref(0);

const pool = computed(() => {
  return items.slice(startIndex.value, startIndex.value + buffer);
});

function computerHeight(start?: number, end?: number) {
  return items.slice(start, end).reduce((acc, item) => {
    const key = `${item.key}`;
    if (heightCache.value.has(key)) {
      return acc + heightCache.value.get(key);
    }
    return acc + itemSize;
  }, 0);
}

const computedTotalHeight = computed(() => {
  return computerHeight();
});

const computedTop = computed(() => {
  return computerHeight(0, startIndex.value);
});

function handleScroll(e: Event) {
  measureHeight();
  const target = e.target as HTMLElement;
  if (target) {
    const scrollTop = target.scrollTop;
    let top = 0;
    for (let i = 0; i < items.length; i++) {
      top += heightCache.value.get(`${items[i].key}`) || itemSize;
      if (top > scrollTop) {
        startIndex.value = i;
        break;
      }
    }
  }
}

const throttledHandleScroll = useThrottleFn(handleScroll, 200, true);
</script>

<template>
  <div class="recycle-scroller" @scroll.passive="throttledHandleScroll">
    <div :style="{ height: `${computedTotalHeight}px` }">
      <div ref="content" :style="{ transform: `translateY(${computedTop}px)` }">
        <div v-for="(item, index) in pool" :key="item.key || index" class="recycle-scroller-item" :data-key="item.key || index">
          <slot :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
