<script setup lang="ts">
import { computed, ref } from 'vue';

const length = ref(1000);

const items = computed(() => {
  return [...new Array(Number(length.value))].map((v, index) => {
    return {
      id: index,
      msg: `${Math.random()}`,
    };
  });
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
    <div>
      <span style="color: red; line-height: 24px;">
        {{ item.id }}:
      </span>
      <span>
        {{ item.msg }}
      </span>
    </div>
  </RecycleScroller>
</template>
