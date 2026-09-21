<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import achievementCheckinSuccess from '@/assets/achievement-checkin-success.png'
import achievementSignIn from '@/assets/achievement-sign-in.png'
import { currentCycleDay, maxCycleDays, resetMealStatus } from '@/data/mealStatus'

const router = useRouter()
const showAchievement = ref(false)
const showCheckinSuccess = ref(false)
let checkinTimer

function showCheckin() {
  showCheckinSuccess.value = true
  clearTimeout(checkinTimer)
  checkinTimer = setTimeout(() => {
    showCheckinSuccess.value = false
  }, 4000)
}

function closeAchievement() {
  showAchievement.value = false
  showCheckinSuccess.value = false
  clearTimeout(checkinTimer)
}

function startExploration() {
  if (currentCycleDay.value >= maxCycleDays) {
    resetMealStatus()
  }

  router.push({ name: 'morning' })
}
</script>

<template>
  <section class="home-page" aria-label="home background">
    <RouterLink
      class="home-action home-action-wuse-yuanhuan"
      :to="{ name: 'wuse-yuanhuan' }"
      aria-label="五色圆环"
    ></RouterLink>
    <RouterLink
      class="home-action home-action-physical-exam"
      :to="{ name: 'physical-exam' }"
      aria-label="体检报告"
    ></RouterLink>
    <RouterLink
      class="home-action home-action-diary"
      :to="{ name: 'wuse-zhouji' }"
      aria-label="五色周记"
    ></RouterLink>
    <RouterLink
      class="home-action home-action-food-book"
      :to="{ name: 'food-book' }"
      aria-label="食养书册"
    ></RouterLink>
    <button
      class="home-action home-action-refresh"
      type="button"
      aria-label="刷新本轮数据"
      @click="resetMealStatus"
    ></button>
    <button
      class="home-action home-action-achievement"
      type="button"
      aria-label="打开成就徽章"
      @click="showAchievement = true"
    ></button>
    <button
      class="home-action home-action-start"
      type="button"
      aria-label="开始探索"
      @click="startExploration"
    ></button>
    <div v-if="showAchievement" class="achievement-modal" role="dialog" aria-label="食养签到集">
      <img class="achievement-modal-image" :src="achievementSignIn" alt="食养签到集" />
      <button
        class="achievement-checkin-action"
        type="button"
        aria-label="食养金币打卡"
        @click="showCheckin"
      ></button>
      <button
        class="achievement-modal-close"
        type="button"
        aria-label="关闭食养签到集"
        @click="closeAchievement"
      ></button>
    </div>
    <img
      v-if="showCheckinSuccess"
      class="achievement-checkin-success"
      :src="achievementCheckinSuccess"
      alt="打卡成功"
    />
  </section>
</template>
