import { MaybeRefOrGetter, onMounted, onUnmounted, toValue, watch } from 'vue';

export function _useEventListener(target: EventTarget, event: string, callback: EventListenerOrEventListenerObject) {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}

export function useEventListener(target: MaybeRefOrGetter<EventTarget>, event: string, callback: EventListenerOrEventListenerObject) {
  onMounted(() => {
    watch(() => toValue(target), (val, oldValue, onCleanup) => {
      onCleanup(() => {
        val?.removeEventListener(event, callback);
      });
      val?.addEventListener(event, callback);
    }, {
      immediate: true,
    });
  });
  onUnmounted(() => {
    toValue(target)?.removeEventListener(event, callback);
  });
}

export function useEventListenerV1(target: MaybeRefOrGetter<EventTarget>, event: string, callback: EventListenerOrEventListenerObject) {
  let currentTarget: EventTarget;
  const updateListener = (_target: EventTarget) => {
    if (currentTarget) {
      currentTarget.removeEventListener(event, callback);
    }
    _target.addEventListener(event, callback);
    currentTarget = _target;
  };

  onMounted(() => {
    watch(() => toValue(target), updateListener, { immediate: true });
  });
  onUnmounted(() => {
    currentTarget.removeEventListener(event, callback);
  });
}
