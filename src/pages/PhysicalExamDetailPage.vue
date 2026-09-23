<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import bg from '@/assets/physical-exam-detail/bg.webp'
import back from '@/assets/physical-exam-detail/back.webp'
import title from '@/assets/physical-exam-detail/title.webp'
import tip from '@/assets/physical-exam-detail/tip.webp'
import fei from '@/assets/physical-exam-detail/fei.webp'
import gan from '@/assets/physical-exam-detail/gan.webp'
import pi from '@/assets/physical-exam-detail/pi.webp'
import shen from '@/assets/physical-exam-detail/shen.webp'
import xin from '@/assets/physical-exam-detail/xin.webp'

const route = useRoute()
const router = useRouter()

const detailPages = {
  xin: { image: xin, label: '心' },
  gan: { image: gan, label: '肝' },
  fei: { image: fei, label: '肺' },
  shen: { image: shen, label: '肾' },
  pi: { image: pi, label: '脾' },
}

const currentPage = computed(() => detailPages[route.params.organ] ?? detailPages.xin)

function goBackToPhysicalExam() {
  router.push({ name: 'physical-exam', query: { organs: '1' } })
}
</script>

<template>
  <section class="scene-page physical-exam-detail-page" :aria-label="currentPage.label">
    <img class="scene-image physical-exam-detail-bg" :src="bg" alt="体检器官详情背景" />
    <img class="scene-overlay physical-exam-detail-title" :src="title" alt="" aria-hidden="true" />
    <img class="scene-overlay physical-exam-detail-tip" :src="tip" alt="" aria-hidden="true" />
    <img class="scene-overlay physical-exam-detail-card" :src="currentPage.image" :alt="currentPage.label" />
    <button
      class="scene-overlay physical-exam-detail-back"
      type="button"
      aria-label="返回体检页面"
      @click="goBackToPhysicalExam"
    >
      <img class="physical-exam-detail-back-image" :src="back" alt="" aria-hidden="true" />
    </button>
  </section>
</template>
