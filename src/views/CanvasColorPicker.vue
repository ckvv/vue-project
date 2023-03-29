<script setup lang="ts">
import { computed, shallowRef } from 'vue';

const canvasRef = shallowRef<HTMLCanvasElement>();
const color = shallowRef('');

const ctx = computed(() => {
  return canvasRef?.value && canvasRef.value.getContext('2d');
});

const controllerFactory = <T = any>(): [Promise<T>, (result: T) => void, (error: any) => void] => {
  let success: (result: T) => void, error: (error: any) => void;
  const controller = new Promise<T>((resolve, reject) => {
    success = resolve;
    error = reject;
  });
  return [controller, success!, error!];
};

const readFile = (file: File): Promise<string> => {
  const [controller, success, error] = controllerFactory();
  const reader = new FileReader();

  reader.addEventListener('loadend', (e) => {
    if (e.target?.result) {
      success(e.target.result);
    }
    else {
      error(new Error('Read file fail'));
    }
  });
  reader.addEventListener('error', (e) => {
    error(e);
  });
  reader.readAsDataURL(file);
  return controller;
};

const loadImage = (url: string): Promise<HTMLImageElement> => {
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
};

const handlerChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) { return; }

  const img = await loadImage(await readFile(files[0]));

  if (canvasRef.value) {
    canvasRef.value.width = img.width;
    canvasRef.value.height = img.height;
  }

  ctx.value?.drawImage(img, 0, 0, img.width, img.height);
};

const handlerMouseover = (event: MouseEvent) => {
  if (ctx.value && canvasRef.value) {
    const { top, left } = canvasRef.value.getBoundingClientRect();
    const data = ctx.value.getImageData(event.x - left, event.y - top, 1, 1).data;
    // https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data
    color.value = `rgba(${data[0]} ${data[1]} ${data[2]} /${data[3]})`;
  }
};
</script>

<template>
  <div>
    <div :style="{ color }">
      选择一张图片获取当前颜色: {{ color }}
    </div>
    <input id="file" type="file" accept="image/*" @change="handlerChange">
    <canvas id="offscreen" ref="canvasRef" @mousemove="handlerMouseover" />
  </div>
</template>
