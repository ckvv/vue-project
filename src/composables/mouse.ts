import { MaybeRef, ref } from 'vue';
import { useEventListener } from './event';

interface Position {
  x: number;
  y: number;
}

interface options {
  target?: MaybeRef<EventTarget>;
  initialValue?: Position;
}

export function useMouse(options?: options) {
  const { target = window, initialValue } = options ?? {};
  const x = ref(initialValue?.x ?? 0);
  const y = ref(initialValue?.y ?? 0);

  function update(event: MouseEvent) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  useEventListener(target, 'mousemove', update);

  return {
    x,
    y,
  };
}
