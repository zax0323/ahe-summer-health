<script setup>
import atlasBack from '@/assets/food-atlas-back.png'
import atlasBeefNoodles from '@/assets/food-atlas-beef-noodles.png'
import atlasRice from '@/assets/food-atlas-rice.png'
import atlasBread from '@/assets/food-atlas-bread.png'
import atlasBurger from '@/assets/food-atlas-burger.png'
import atlasTitle from '@/assets/food-atlas-title.png'
import atlasSandwich from '@/assets/food-atlas-sandwich.png'
import atlasHint from '@/assets/food-atlas-hint.png'
import atlasFilters from '@/assets/food-atlas-filters.png'
import atlasPasta from '@/assets/food-atlas-pasta.png'
import atlasSushi from '@/assets/food-atlas-sushi.png'
import atlasUdon from '@/assets/food-atlas-udon.png'

const foodAtlasLayers = [
  { src: atlasBack, alt: 'food atlas back button' },
  { src: atlasTitle, alt: 'food atlas title' },
  { src: atlasFilters, alt: 'food atlas filters' },
  { src: atlasRice, alt: 'rice card' },
  { src: atlasBread, alt: 'bread card' },
  { src: atlasBeefNoodles, alt: 'beef noodles card' },
  { src: atlasBurger, alt: 'burger card' },
  { src: atlasSandwich, alt: 'sandwich card' },
  { src: atlasSushi, alt: 'sushi card' },
  { src: atlasPasta, alt: 'pasta card' },
  { src: atlasUdon, alt: 'udon card' },
  { src: atlasHint, alt: 'food atlas hint' },
]

const foodAtlasActions = [
  { label: 'view rice details', className: 'food-atlas-action-rice' },
  { label: 'view bread details', className: 'food-atlas-action-bread' },
  { label: 'view sandwich details', className: 'food-atlas-action-sandwich' },
  {
    label: 'view burger details',
    className: 'food-atlas-action-burger',
    to: { name: 'food-intro', query: { food: 'burger' } },
  },
  {
    label: 'view sushi details',
    className: 'food-atlas-action-sushi',
    to: { name: 'food-intro', query: { food: 'sushi' } },
  },
  { label: 'view udon details', className: 'food-atlas-action-udon' },
  {
    label: 'view beef noodles details',
    className: 'food-atlas-action-beef-noodles',
    to: { name: 'food-intro', query: { food: 'beef-noodles' } },
  },
  { label: 'view pasta details', className: 'food-atlas-action-pasta' },
]
</script>

<template>
  <section class="scene-page food-atlas-page" aria-label="food atlas scene">
    <img class="scene-image" src="@/assets/food-atlas-bg.png" alt="food atlas" />
    <img
      v-for="layer in foodAtlasLayers"
      :key="layer.alt"
      class="scene-overlay food-atlas-overlay"
      :src="layer.src"
      :alt="layer.alt"
    />
    <RouterLink
      class="food-atlas-back-action"
      to="/food-book"
      aria-label="back to food book"
    ></RouterLink>
    <RouterLink
      v-for="action in foodAtlasActions"
      :key="action.className"
      class="food-atlas-action"
      :class="action.className"
      :to="action.to ?? '/food-intro'"
      :aria-label="action.label"
    ></RouterLink>
  </section>
</template>
