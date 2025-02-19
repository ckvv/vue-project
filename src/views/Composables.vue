<script setup lang="ts">
import { useMouse } from '@/composables/mouse.js';
import { ref, useTemplateRef } from 'vue';

const greenRef = useTemplateRef('green');
const target = ref<EventTarget>(window);
const point = useMouse({
  target,
});

function setTarget(val?: EventTarget) {
  target.value = !val ? window : val;
}
</script>

<template>
  <div classs="flex flex-col gap-1 bg-green">
    <div class="bg-red">
      {{ target }}
      {{ point }}
    </div>
    <div ref="green" class="bg-green w-100 h-100" />
    <button @click="setTarget()">
      点击切换 Target Window
    </button>
    <button @click="setTarget(greenRef)">
      点击切换 Target Green
    </button>
  </div>
</template>
