<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import routes from '~pages';

const router = useRouter();
const route = useRoute();

const path = computed(() => route.path || '');
const options = routes.map(route => ({ label: route.name, value: route.path })) as any[];

const toPath = (path = '/') => {
  router.push(path);
};
</script>

<template>
  <div class="view-wrapper w-full h-full">
    <div class="flex items-center gap-1 position-fixed top-2 right-2">
      <el-select-v2 :model-value="path" :options="options"
        placeholder="Please Select Views" filterable @change="toPath" />
      <a href="https://github.com/ckvv/vue-project">Github</a>
    </div>
    <slot />
    <span v-if="route.name !== 'Home'" class="i-b:home text-6 fixed right-2 top-2 hover:cursor-pointer"
      @click="toPath('/home')" />
  </div>
</template>
