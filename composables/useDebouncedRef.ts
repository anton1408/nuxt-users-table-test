import type { Ref } from 'vue';

/**
 * Returns a debounced ref that updates after the specified delay.
 */
export function useDebouncedRef<T>(source: Ref<T>, delayMs: number): Ref<T> {
  const debounced = ref(source.value) as Ref<T>;

  let timer: ReturnType<typeof setTimeout> | undefined;

  watch(source, (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      debounced.value = value;
    }, delayMs);
  });

  onBeforeUnmount(() => clearTimeout(timer));

  return debounced;
}
