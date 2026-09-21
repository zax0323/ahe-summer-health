<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import defaultOverlay from '@/assets/food-intro-overlay.png'
import burgerIcon from '@/assets/food-intro-burger-icon.png'
import burgerTitle from '@/assets/food-intro-burger-title.png'
import burgerTip from '@/assets/food-intro-burger-tip.png'
import burgerInfo from '@/assets/food-intro-burger-info.png'
import beefNoodlesIcon from '@/assets/food-intro-beef-noodles-icon.png'
import beefNoodlesTitle from '@/assets/food-intro-beef-noodles-title.png'
import beefNoodlesTip from '@/assets/food-intro-beef-noodles-tip.png'
import beefNoodlesInfo from '@/assets/food-intro-beef-noodles-info.png'
import sushiIcon from '@/assets/food-intro-sushi-icon.png'
import sushiTitle from '@/assets/food-intro-sushi-title.png'
import sushiTip from '@/assets/food-intro-sushi-tip.png'
import sushiInfo from '@/assets/food-intro-sushi-info.png'

const route = useRoute()

const defaultLayers = [{ src: defaultOverlay, alt: 'food intro' }]
const burgerLayers = [
  { src: burgerTitle, alt: 'burger title' },
  { src: burgerIcon, alt: 'burger icon' },
  { src: burgerInfo, alt: 'burger intro' },
  { src: burgerTip, alt: 'burger tip' },
  { src: defaultOverlay, alt: 'food intro back button' },
]

const beefNoodlesLayers = [
  { src: beefNoodlesTitle, alt: 'beef noodles title' },
  { src: beefNoodlesIcon, alt: 'beef noodles icon' },
  { src: beefNoodlesInfo, alt: 'beef noodles intro' },
  { src: beefNoodlesTip, alt: 'beef noodles tip' },
  { src: defaultOverlay, alt: 'food intro back button' },
]

const sushiLayers = [
  { src: sushiTitle, alt: 'sushi title' },
  { src: sushiIcon, alt: 'sushi icon' },
  { src: sushiInfo, alt: 'sushi intro' },
  { src: sushiTip, alt: 'sushi tip' },
  { src: defaultOverlay, alt: 'food intro back button' },
]

const foodIntroLayerMap = {
  burger: burgerLayers,
  'beef-noodles': beefNoodlesLayers,
  sushi: sushiLayers,
}

const foodIntroLayers = computed(() => foodIntroLayerMap[route.query.food] ?? defaultLayers)
</script>

<template>
  <section class="scene-page food-intro-page" aria-label="food intro scene">
    <img class="scene-image" src="@/assets/food-intro-bg.png" alt="food intro background" />
    <img
      v-for="layer in foodIntroLayers"
      :key="layer.alt"
      class="scene-overlay food-intro-overlay"
      :src="layer.src"
      :alt="layer.alt"
    />
    <RouterLink
      class="food-intro-action food-intro-action-back"
      to="/food-atlas"
      aria-label="back to food atlas"
    ></RouterLink>
  </section>
</template>
