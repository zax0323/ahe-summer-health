<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bg from '@/assets/wuse-zhouji/bg.png'
import title from '@/assets/wuse-zhouji/title.png'
import detail from '@/assets/wuse-zhouji/detail.png'
import back from '@/assets/wuse-zhouji/back.png'
import progress from '@/assets/wuse-zhouji/progress.png'
import day13 from '@/assets/wuse-zhouji/day-1-3.png'
import day4 from '@/assets/wuse-zhouji/day-4.png'
import day5 from '@/assets/wuse-zhouji/day-5.png'
import footer from '@/assets/wuse-zhouji/footer.png'

const router = useRouter()
const scrollViewport = ref(null)

const weekDayActions = [
  {
    day: '1',
    label: '查看第一天今日生活记录',
    className: 'wuse-zhouji-day-action-1',
  },
  {
    day: '2',
    label: '查看第二天今日生活记录',
    className: 'wuse-zhouji-day-action-2',
  },
]

const handleWheel = (event) => {
  if (!scrollViewport.value) {
    return
  }

  scrollViewport.value.scrollTop += event.deltaY
}

const viewDetails = () => {
  if (!scrollViewport.value) {
    return
  }

  scrollViewport.value.scrollTo({
    top: scrollViewport.value.scrollHeight,
    behavior: 'smooth',
  })
}

const viewWeekDay = (day) => {
  router.push({
    name: 'today-record',
    query: {
      source: 'wuse-zhouji',
      day,
    },
  })
}
</script>

<template>
  <section class="scene-page wuse-zhouji-page" aria-label="五色周记">
    <img class="scene-image wuse-zhouji-bg" :src="bg" alt="五色周记背景" />
    <img class="scene-overlay wuse-zhouji-title" :src="title" alt="五色周记" />
    <img class="scene-overlay wuse-zhouji-progress" :src="progress" alt="本周进度" />
    <img class="scene-overlay wuse-zhouji-back-image" :src="back" alt="" aria-hidden="true" />

    <RouterLink class="wuse-zhouji-back-action" :to="{ name: 'home' }" aria-label="返回" />

    <div
      ref="scrollViewport"
      class="wuse-zhouji-scroll-viewport"
      @wheel.prevent="handleWheel"
    >
      <div class="wuse-zhouji-scroll-content">
        <img class="wuse-zhouji-scroll-image" :src="day13" alt="前三天" />
        <img class="wuse-zhouji-scroll-image" :src="day4" alt="第四天" />
        <img class="wuse-zhouji-scroll-image" :src="day5" alt="第五天" />
      </div>
    </div>

    <button
      v-for="action in weekDayActions"
      :key="action.day"
      class="wuse-zhouji-day-action"
      :class="action.className"
      type="button"
      :aria-label="action.label"
      @click="viewWeekDay(action.day)"
    />

    <img class="scene-overlay wuse-zhouji-detail-image" :src="detail" alt="" aria-hidden="true" />
    <button class="wuse-zhouji-detail-action" type="button" aria-label="查看详情" @click="viewDetails" />

    <img class="scene-overlay wuse-zhouji-footer" :src="footer" alt="" aria-hidden="true" />
  </section>
</template>
