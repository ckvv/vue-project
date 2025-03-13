<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');
function getImageData(w: number, h: number) {
  const imageData = new ImageData(w, h);
  const length = imageData.data.length;
  for (let i = 0; i < length; i += 4) {
    const x = ((i % (w * 4)) / (w * 4)) * 255;
    const y = (i / (w * 4) / h) * 255;

    imageData.data[i + 0] = x; // R value
    imageData.data[i + 1] = y; // G value
    imageData.data[i + 2] = 255 - x; // B value
    imageData.data[i + 3] = 255; // A value
  }
  return imageData;
}

function updateCanvas(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  });

  ctx.putImageData(getImageData(width, height), 0, 0);
}

// onMounted(() => {
//   updateCanvas(canvasRef.value);
// });
function update() {
  updateCanvas(canvasRef.value);
}
</script>

<template>
  <div>
    <canvas ref="canvasRef" class="w-60 h-60" />
  </div>
  <button @click="update">
    更新颜色
  </button>
</template>
