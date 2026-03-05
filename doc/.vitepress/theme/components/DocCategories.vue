<script setup>
import rust from "./svg/rust.svg?raw";
import kotlin from "./svg/kotlin.svg?raw";
import cpp from "./svg/cpp.svg?raw";
import java from "./svg/java.svg?raw";
import csharp from "./svg/csharp.svg?raw";
import android from "./svg/android.svg?raw";
import mc from "./svg/minecraft.svg?raw";

const myDocs = [
  {
    title: '🛠️ 后端与运维',
    items: [
      {
        icon: rust,
        title: 'Rust',
        desc: 'Rust主打内存安全与极高的运行性能，是现代系统编程的新星',
        link: '/docs/backend/rust/primary/'
      },
      {
        icon: kotlin,
        title: 'Kotlin',
        desc: "Kotlin是谷歌推荐的安卓开发语言，其语法设计极其简洁且安全",
        link: "/docs/backend/kotlin/primary/",
        hot: true
      },
      {
        icon: cpp,
        title: 'C++',
        desc: "C++是一门底层性能极强且支持面向对象的系统编程语言",
        link: "/docs/backend/cpp/primary/"
      },
      {
        icon: java,
        title: 'Java',
        desc: "Java凭借优秀的跨平台生态，长期主导着全球企业级后端开发。",
        link: "/docs/backend/java/primary/"
      },
      {
        icon: csharp,
        title: 'C#',
        desc: "C#是微软主推的现代化编程语言，广泛用于企业级和游戏开发。",
        link: "/docs/backend/csharp/primary/"
      },
    ]
  },
  {
    title: "安桌",
    items: [
      {icon: android, title: "Android 开发", desc: "", link: "/docs/android/"}
    ]
  },
  {
    title: "娱乐",
    items: [
      {icon: mc, title: "开发 Minecraft 模组", desc: "我爱玩方块人 QwQ", link: "/docs/funny/minecraft-mod/"}
    ]
  },
  {
    title: "📒 项目和随笔",
    items: [
      {icon: '🚌', title: "ToDay", desc: "", link: "/docs/project/today"},
      {
        icon: '👨‍💻',
        title: "你真的弄懂二进制了吗？",
        desc: "一篇文档带你从头到尾了解二进制，以及二进制的实际用途",
        link: "/docs/essay/binary/"
      },
      {
        icon: '🌸',
        title: "如何写好代码",
        desc: "写代码容易，写好代码难，只有写好代码，才能做到一码传三代",
        link: "/docs/essay/beautiful-codes/"
      }
    ]
  }
]
</script>

<template>
  <div class="custom-features">
    <div v-for="(cat, index) in myDocs" :key="index" class="category-block">

      <h2 class="category-title">{{ cat.title }}</h2>

      <div class="card-grid">
        <a v-for="(item, i) in cat.items" :key="i" :href="`/saviya${item.link}`" class="card">
          <div class="card__header">
            <div class="icon-wrapper" v-if="item.icon">
              <div class="icon" v-html="item.icon"></div>
            </div>
            <h3>{{ item.title }}</h3>
            <div class="hot" v-if="item.hot">
              <span>
                推荐
              </span>
            </div>
          </div>
          <p class="card-desc">{{ item.desc }}</p>

          <p class="card-text">
            立即访问 ->
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card .hot {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  height: 22px;
  color: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-bg);
  padding: 0 8px 0 8px;
  border-radius: 15px;
}

.card-text {
  margin-top: 6px;
  padding: 0;
  margin-bottom: -4px;
  font-size: 14px;
  color: var(--vp-c-brand-1);
}

.custom-features {
  max-width: 1152px;
  margin: 0 auto;
}

.card__header {
  display: flex;
  margin-bottom: 6px;
  gap: 16px;
  align-items: center;
  justify-content: start;
}

.category-block {
  margin-bottom: 2rem;
}

.category-title {
  margin: 2rem 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: none;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  transition: all 0.25s;
  text-decoration: none !important;
  height: 100%;
}

.card:hover {
  border-color: var(--vp-c-brand);
}

.card .icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: var(--vp-c-default-soft);
}

.card .icon {
  width: 22px;
  height: 22px;
}

.card h3 {
  margin: 0 0 0 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card .card-desc {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>