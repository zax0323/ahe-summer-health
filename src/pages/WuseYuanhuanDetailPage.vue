<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import gan from '@/assets/wuse-yuanhuan-detail/gan.webp'
import xin from '@/assets/wuse-yuanhuan-detail/xin.webp'
import pi from '@/assets/wuse-yuanhuan-detail/pi.webp'
import shen from '@/assets/wuse-yuanhuan-detail/shen.webp'
import fei from '@/assets/wuse-yuanhuan-detail/fei.webp'

const route = useRoute()
const detailPages = {
  gan: { image: gan, label: '肝' },
  xin: { image: xin, label: '心' },
  pi: { image: pi, label: '脾' },
  shen: { image: shen, label: '肾' },
  fei: { image: fei, label: '肺' },
}

const currentPage = computed(() => detailPages[route.params.organ] ?? detailPages.gan)
</script>

<template>
  <section class="scene-page wuse-yuanhuan-detail-page" :aria-label="currentPage.label">
    <img class="scene-image" :src="currentPage.image" :alt="currentPage.label" />
    <RouterLink
      class="wuse-yuanhuan-detail-close-action"
      :to="{ name: 'wuse-yuanhuan' }"
      aria-label="返回五色圆环"
    />
  </section>
</template>
