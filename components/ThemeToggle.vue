<template>
  <button
    type="button"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
    class="rounded border border-gray-300 px-3 py-1.5 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
    @click="toggle"
  >
    <ClientOnly>
      {{ isDark ? '☀️' : '🌙' }}
      <template #fallback>🌙</template>
    </ClientOnly>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}
</script>
