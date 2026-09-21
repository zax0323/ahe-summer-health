<script setup>
import bg from '@/assets/wuse-yuanhuan/bg.png'
import back from '@/assets/wuse-yuanhuan/back.png'
import hint from '@/assets/wuse-yuanhuan/hint.png'
import circle from '@/assets/wuse-yuanhuan/circle.png'
import circleTopLabel from '@/assets/wuse-yuanhuan/circle-top-label.png'
import circleBottomLabel from '@/assets/wuse-yuanhuan/circle-bottom-label.png'
import black from '@/assets/wuse-yuanhuan/black.png'
import green from '@/assets/wuse-yuanhuan/green.png'
import red from '@/assets/wuse-yuanhuan/red.png'
import white from '@/assets/wuse-yuanhuan/white.png'
import yellow from '@/assets/wuse-yuanhuan/yellow.png'
import weeklyNote from '@/assets/wuse-yuanhuan/weekly-note.png'
import recipeBook from '@/assets/wuse-yuanhuan/recipe-book.png'
import achievementBadge from '@/assets/wuse-yuanhuan/achievement-badge.png'

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
