<script setup lang="ts">
import { computed, onMounted, shallowRef } from 'vue';

navigator.mediaDevices.getUserMedia({
  audio: {

  },
});

const canvasRef = shallowRef<HTMLCanvasElement>();

const color = shallowRef(new Uint8ClampedArray([0, 0, 0, 0]) as Uint8ClampedArray<ArrayBufferLike>);

const ctx = computed(() => {
  return canvasRef?.value && canvasRef.value.getContext('2d', {
    willReadFrequently: true,
  });
});

function controllerFactory<T = any>(): [Promise<T>, (result: T) => void, (error: any) => void] {
  let success: (result: T) => void, error: (error: any) => void;
  const controller = new Promise<T>((resolve, reject) => {
    success = resolve;
    error = reject;
  });
  return [controller, success!, error!];
}

function readFile(file: File): Promise<string> {
  const [controller, success, error] = controllerFactory();
  const reader = new FileReader();

  reader.addEventListener('loadend', (e) => {
    if (e.target?.result) {
      success(e.target.result);
    } else {
      error(new Error('Read file fail'));
    }
  });
  reader.addEventListener('error', (e) => {
    error(e);
  });
  reader.readAsDataURL(file);
  return controller;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  const [controller, success, error] = controllerFactory<HTMLImageElement>();
  const img = new Image();
  img.src = url;
  img.onload = () => {
    success(img);
  };
  img.onerror = (e) => {
    error(e);
  };
  return controller;
}

function getImageData(w: number, h: number) {
  const imageData = new ImageData(w, h);
  const length = imageData.data.length;
  for (let i = 0; i < length; i += 4) {
    // Percentage in the x direction, times 255
    const x = ((i % (w * 4)) / (w * 4)) * 255;
    // Percentage in the y direction, times 255
    const y = (i / (w * 4) / h) * 255;

    // Modify pixel data
    imageData.data[i + 0] = x; // R value
    imageData.data[i + 1] = y; // G value
    imageData.data[i + 2] = 255 - x; // B value
    imageData.data[i + 3] = 255; // A value
  }

  if (canvasRef.value) {
    canvasRef.value.width = w;
    canvasRef.value.height = h;
  }

  return imageData;
}

onMounted(() => {
  if (ctx.value) {
    ctx.value.putImageData(getImageData(200, 200), 0, 0);
  }
});

async function handlerChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) {
    return;
  }

  const img = await loadImage(await readFile(files[0]));

  if (canvasRef.value) {
    canvasRef.value.width = img.width;
    canvasRef.value.height = img.height;
  }

  ctx.value?.drawImage(img, 0, 0, img.width, img.height);
}

function handlerMouseover(event: MouseEvent) {
  if (ctx.value && canvasRef.value) {
    const { top, left } = canvasRef.value.getBoundingClientRect();
    // https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data
    color.value = ctx.value.getImageData(event.x - left, event.y - top, 1, 1).data;
  }
}
</script>

<template>
  <div>
    <div :style="{ color: `rgba(${color[0]} ${color[1]} ${color[2]} /${color[3]})` }">
      获取图片中的颜色: {{ color }},
      <input id="file" type="file" accept="image/*" @change="handlerChange">
    </div>
    <canvas ref="canvasRef" @mousemove="handlerMouseover" />

    <div class="jian-bian w-100 h-10" />
    <div class="w-100 h-10" style="background: linear-gradient(to left, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%) );" />
    <div class="w-100 h-10" style="background: linear-gradient(to right, red 0%, orange 20%, yellow 40%, green 60%, blue 80%, indigo 100%);" />
    <div class="w-100 h-10" style="background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%), hsl(150, 100%, 50%), hsl(180, 100%, 50%), hsl(210, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 100%, 50%), hsl(300, 100%, 50%), hsl(330, 100%, 50%), hsl(360, 100%, 50%) );" />
    <div class="w-100 h-10" style="background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%) );" />
  </div>
</template>

<style scoped>
.jian-bian {
  background: linear-gradient(to right,
                #ff0000 0%,
                #ff00ff 17%,
                #0000ff 33%,
                #00ffff 50%,
                #00ff00 67%,
                #ffff00 83%,
                #ff0000 100%);
}
</style>
