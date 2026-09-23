<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import summerNote01 from '@/assets/summer-note-01.webp'
import summerNote02 from '@/assets/summer-note-02.webp'
import summerNote03 from '@/assets/summer-note-03.webp'
import summerNoteOverlay from '@/assets/summer-note-overlay.webp'

const router = useRouter()

const summerNoteImages = [summerNote01, summerNote02, summerNote03]
const summerNoteIndex = ref(0)
const selectedSummerNote = computed(() => summerNoteImages[summerNoteIndex.value])

const goPrevious = () => {
  summerNoteIndex.value = (summerNoteIndex.value + summerNoteImages.length - 1) % summerNoteImages.length
}

const goNext = () => {
  summerNoteIndex.value = (summerNoteIndex.value + 1) % summerNoteImages.length
}

const goBack = () => {
  router.push({ name: 'food-book' })
}
</script>

<template>
  <section class="scene-page summer-note-page" aria-label="summer note scene">
    <img class="scene-image" :src="selectedSummerNote" alt="summer note" />
    <img class="scene-overlay summer-note-overlay" :src="summerNoteOverlay" alt="" aria-hidden="true" />
    <button class="summer-note-back-action" type="button" aria-label="back to food book" @click="goBack"></button>
    <button class="summer-note-nav-button summer-note-nav-button-prev" type="button" aria-label="上一张夏日札记" @click="goPrevious"></button>
    <button class="summer-note-nav-button summer-note-nav-button-next" type="button" aria-label="下一张夏日札记" @click="goNext"></button>
  </section>
</template>
