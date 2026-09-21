<template>
  <section class="scene-page morning-page" aria-label="morning scene">
    <template v-if="isVideoEnded">
      <img
        class="scene-image morning-observation-image"
        src="@/assets/morning-observation.png"
        alt="晨间观察页面"
      />
      <RouterLink class="morning-back-action" to="/" aria-label="返回首页"></RouterLink>
      <RouterLink
        class="morning-observation-start-action"
        :to="{ name: 'morning-meal' }"
        aria-label="去准备早餐"
      ></RouterLink>
    </template>
    <video
      v-else
      class="scene-video morning-transition-video"
      src="@/assets/transition-morning-qichuang.mp4"
      autoplay
      muted
      playsinline
      @ended="isVideoEnded = true"
    ></video>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isVideoEnded = ref(false)
</script>
