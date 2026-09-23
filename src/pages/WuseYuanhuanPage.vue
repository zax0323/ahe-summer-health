<script setup>
import bg from '@/assets/wuse-yuanhuan/bg.webp'
import back from '@/assets/wuse-yuanhuan/back.webp'
import hint from '@/assets/wuse-yuanhuan/hint.webp'
import circle from '@/assets/wuse-yuanhuan/circle.webp'
import circleTopLabel from '@/assets/wuse-yuanhuan/circle-top-label.webp'
import circleBottomLabel from '@/assets/wuse-yuanhuan/circle-bottom-label.webp'
import black from '@/assets/wuse-yuanhuan/black.webp'
import green from '@/assets/wuse-yuanhuan/green.webp'
import red from '@/assets/wuse-yuanhuan/red.webp'
import white from '@/assets/wuse-yuanhuan/white.webp'
import yellow from '@/assets/wuse-yuanhuan/yellow.webp'
import weeklyNote from '@/assets/wuse-yuanhuan/weekly-note.webp'
import recipeBook from '@/assets/wuse-yuanhuan/recipe-book.webp'
import achievementBadge from '@/assets/wuse-yuanhuan/achievement-badge.webp'

const layers = [
  back,
  hint,
  circle,
  black,
  green,
  red,
  white,
  yellow,
  circleTopLabel,
  circleBottomLabel,
  weeklyNote,
  recipeBook,
  achievementBadge,
]

const elementActions = [
  { key: 'gan', name: '肝', className: 'wuse-yuanhuan-element-gan' },
  { key: 'xin', name: '心', className: 'wuse-yuanhuan-element-xin' },
  { key: 'pi', name: '脾', className: 'wuse-yuanhuan-element-pi' },
  { key: 'shen', name: '肾', className: 'wuse-yuanhuan-element-shen' },
  { key: 'fei', name: '肺', className: 'wuse-yuanhuan-element-fei' },
]
</script>

<template>
  <section class="scene-page wuse-yuanhuan-page" aria-label="五色圆环">
    <img class="scene-image" :src="bg" alt="五色圆环背景" />
    <img
      v-for="layer in layers"
      :key="layer"
      class="scene-overlay wuse-yuanhuan-layer"
      :src="layer"
      alt=""
      aria-hidden="true"
    />
    <RouterLink
      v-for="action in elementActions"
      :key="action.key"
      class="wuse-yuanhuan-element-action"
      :class="action.className"
      :to="{ name: 'wuse-yuanhuan-detail', params: { organ: action.key } }"
      :aria-label="action.name"
    />
    <RouterLink class="wuse-yuanhuan-back-action" :to="{ name: 'home' }" aria-label="返回首页" />
  </section>
</template>
