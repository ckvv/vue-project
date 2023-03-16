<script setup lang="ts">
import { useRouter } from 'vue-router';
import routes from '~pages';

const router = useRouter();

const links = {
  '@ckvv': 'chenkai.life',
  'GitHub': 'https://github.com/ckvv',
};
</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <h1>
      All Views
    </h1>
    <el-space wrap size="large" class="justify-center">
      <el-link v-for="route in routes" :key="route.path" class="w-40" :underline="false" @click="router.push(route.path)">
        {{ route.name }}
      </el-link>
      <div v-for="n in 9" :key="n" class="w-40 h-0" />
    </el-space>
    <el-space class="h-20">
      <el-link v-for="(value, key) in links" :key="value">
        {{ key }}
      </el-link>
    </el-space>
  </div>
</template>
