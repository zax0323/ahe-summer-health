<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getTodayRecordScore } from '@/data/todayRecord'
import { gameEndingInfo, resolveGameEnding } from '@/data/gameEnding'

const router = useRouter()
const endingVideoModules = import.meta.glob('../assets/ending-*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
})

const endingKey = computed(() => resolveGameEnding(getTodayRecordScore()))
const ending = computed(() => gameEndingInfo[endingKey.value])
const endingVideo = computed(() => {
  return endingVideoModules[`../assets/ending-${endingKey.value}.mp4`] ?? null
})

const goToHome = () => {
  router.push({ name: 'home' })
}

const handleVideoEnded = () => {
  goToHome()
}
</script>

<template>
  <section class="game-ending-page" :class="`game-ending-page-${endingKey}`" :aria-label="ending.label">
    <video
      v-if="endingVideo"
      class="game-ending-video"
      :src="endingVideo"
      autoplay
      controls
      muted
      playsinline
      @ended="handleVideoEnded"
    />
    <div v-else class="game-ending-pending">
      <p class="game-ending-label">{{ ending.label }}</p>
      <p class="game-ending-description">{{ ending.description }}</p>
      <p class="game-ending-pending-note">结局视频待补充</p>
    </div>

    <div class="game-ending-toolbar">
      <p class="game-ending-title">{{ ending.label }}</p>
      <button class="game-ending-home-action" type="button" @click="goToHome">返回首页</button>
    </div>
  </section>
</template>
