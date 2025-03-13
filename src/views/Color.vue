<script setup lang="ts">
const base = Array.from({ length: 11 });
const keyword = [];
const hex = [];
const rgb = [];
const hsl = [];
const hwb = [];
const oklab = [];
const oklch = base.map((v, index) => {
  return `hwb(${index * 36} 0% 0%)`;
});
const oklchw = base.map((v, index) => {
  return `hwb(0 ${index * 10}% 0%)`;
});
const oklcb = base.map((v, index) => {
  return `hwb(0 0% ${index * 10}%)`;
});
</script>

<template>
  <div>
    <div>hwb(0 0% 0%) - hwb(360 0% 0%)</div>
    <ColorList :data="oklch" />
    <div>hwb(0 0% 0%) - hwb(0 100% 0%)</div>
    <ColorList :data="oklchw" />
    <div>hwb(0 0% 0%) - hwb(0 0% 100%)</div>
    <ColorList :data="oklcb" />
  </div>
</template>
