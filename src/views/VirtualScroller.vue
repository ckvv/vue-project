<script setup lang="ts">
import { computed, ref } from 'vue';

const length = ref(10000);

const items = computed(() => {
  return Array.from({ length: length.value }).map((v, index) => ({ id: index, key: index, value: Math.random() }));
});
</script>

<template>
  虚拟滚动, 你可以打开调试页面查看实际渲染的元素
  <input v-model="length">

  <h1>动态更新 paddingTop paddingBottom 实现</h1>
  <RecycleScroller
    v-slot="{ item }"
    class="h-[240px] overflow-auto"
    :buffer="20"
    :items="items"
    :item-size="24"
  >
    <div class="color-red h-[24px]">
      <span>
        {{ item.id }}: {{ item.value }}
      </span>
    </div>
  </RecycleScroller>

  <h1>动态更新 translateY 实现</h1>
  <RecycleScroller2
    v-slot="{ item }"
    class="h-[240px] overflow-auto"
    :buffer="20"
    :items="items"
    :item-size="24"
  >
    <div class="color-red h-[24px]">
      <span>
        {{ item.id }}: {{ item.value }}
      </span>
    </div>
  </RecycleScroller2>

  <h1>不定高度虚拟列表实现</h1>
  <RecycleScroller3
    v-slot="{ item }"
    class="h-[440px] overflow-auto"
    :buffer="30"
    :items="items"
    :item-size="24"
  >
    <div class="color-red" :style="{ height: `${item.value * 100 + 22}px` }">
      <span>
        {{ item.id }}: {{ item.value }}
      </span>
    </div>
  </RecycleScroller3>
</template>
