<template>
  <figure class="image-card">
    <img :src="src" :alt="alt" :title="title || alt" />
    <figcaption v-if="title">{{ title }}</figcaption>
  </figure>
</template>

<script setup>
defineProps(['src', 'alt', 'title'])
</script>

<style scoped>
.image-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 0;
}

figcaption {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>