// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocTitle from './DocTitle.vue'
import './style.css'
import ImageCard from "./components/ImageCard.vue";
import Spoiler from "./components/Spoiler.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(DocTitle)
    })
  },
  enhanceApp({ app }) {
    app.component("ImageCard", ImageCard);
    app.component('Spoiler', Spoiler)
  }
} satisfies Theme
