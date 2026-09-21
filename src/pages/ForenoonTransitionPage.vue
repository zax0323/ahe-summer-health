<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToForenoonFeedback = () => {
  router.push({ name: 'forenoon-feedback' })
}
</script>

<template>
  <section class="scene-page forenoon-transition-page" aria-label="forenoon transition scene">
    <video
      class="scene-video forenoon-transition-video"
      src="@/assets/transition-forenoon-xuexi.mp4"
      autoplay
      muted
      playsinline
      @ended="goToForenoonFeedback"
    />
  </section>
</template>
