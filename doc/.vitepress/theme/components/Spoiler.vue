<template>
  <span
      class="spoiler-container"
      :class="{ 'is-visible': isVisible }"
      @mouseenter="isVisible = true"
      @mouseleave="isVisible = false"
  >
    <slot></slot>
  </span>
</template>

<script setup>
import { ref } from 'vue'
const isVisible = ref(false)
</script>

<style scoped>
.spoiler-container {
  background-color: var(--vp-c-text-1);
  color: transparent;
  border-radius: 4px;
  padding: 0 4px;
  transition: all 0.3s ease;
  user-select: none;
  cursor: pointer;
}

.spoiler-container.is-visible {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  user-select: auto;
}
</style>