<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, page } = useData()

// 格式化日期的函数
const date = computed(() => {
  if (!page.value.lastUpdated) return ''
  return new Date(page.value.lastUpdated).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<template>
  <div class="custom-title-wrapper">
    <h1 class="doc-title">{{ frontmatter.title || page.title }}</h1>
    <p class="doc-detail" v-if="frontmatter.detail">
      {{ frontmatter.detail }}
    </p>

    <div v-if="date" class="doc-info">
      <span class="date-icon">🕒</span>
      <span>最后更新于: {{ date }}</span>
    </div>

    <hr class="hr-divider" />
  </div>
</template>

<style scoped>
.custom-title-wrapper {
  margin-bottom: 2rem;
}

.doc-detail {
  color: var(--vp-c-text-2);
}

.doc-title {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.hr-divider {
  margin-top: 1rem;
  opacity: 30%;
}

.doc-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.date-icon {
  font-size: 0.6rem;
}
</style>