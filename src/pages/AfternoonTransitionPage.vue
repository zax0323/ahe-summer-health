<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAfternoonFeedback = () => {
  if (router.hasRoute('afternoon-feedback')) {
    router.push({ name: 'afternoon-feedback' })
  }
}
</script>

<template>
  <section class="scene-page afternoon-transition-page" aria-label="afternoon transition scene">
    <video
      class="scene-video afternoon-transition-video"
      src="@/assets/transition-afternoon-yundong.mp4"
      autoplay
      muted
      playsinline
      @ended="goToAfternoonFeedback"
    />
  </section>
</template>
