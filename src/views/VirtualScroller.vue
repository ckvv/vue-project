<script setup lang="ts">
import { computed, ref } from 'vue';

const length = ref(10000);

const items = computed(() => {
  return Array.from({length: length.value}).map((v, index) => ({ id: index, value: Math.random()}));
});
</script>

<template>
  虚拟滚动, 你可以打开调试页面查看实际渲染的元素
  <input v-model="length">
  <RecycleScroller
    v-slot="{ item }"
    style="height: 240px; overflow: scroll;"
    :buffer="10"
    :items="items"
    :item-size="24"
  >
    <div class="color-red h-[24px]">
      <span>
        {{ item.id }}: {{ item.value }}
      </span>
    </div>
  </RecycleScroller>
</template>
