<script setup lang="ts">
import { computed, onMounted, shallowRef } from 'vue';

const canvasRef = shallowRef<HTMLCanvasElement>();
const color = shallowRef(new Uint8ClampedArray([0, 0, 0, 0]));

const ctx = computed(() => {
  return canvasRef?.value && canvasRef.value.getContext('2d', {
    willReadFrequently: true,
  });
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

const getImageData = (w: number, h: number) => {
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
};

onMounted(() => {
  if (ctx.value) {
    ctx.value.putImageData(getImageData(200, 200), 0, 0);
  }
});

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
    // https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data
    color.value = ctx.value.getImageData(event.x - left, event.y - top, 1, 1).data;
  }
};
</script>

<template>
  <div>
    <div :style="{ color: `rgba(${color[0]} ${color[1]} ${color[2]} /${color[3]})` }">
      获取图片中的颜色: {{ color }},
      <input id="file" type="file" accept="image/*" @change="handlerChange">
    </div>
    <canvas id="offscreen" ref="canvasRef" @mousemove="handlerMouseover" />
  </div>
</template>
