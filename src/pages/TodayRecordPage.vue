<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import todayRecordBg from '@/assets/today-record/bg.webp'
import todayRecordBack from '@/assets/today-record/back.webp'
import todayRecordComplete from '@/assets/today-record/complete.webp'
import todayRecordWeekDay1 from '@/assets/today-record/today-record-day-1.webp'
import todayRecordWeekDay2 from '@/assets/today-record/today-record-day-2.webp'
import { getTodayRecordScore, todayRecordStatusAssets } from '@/data/todayRecord'
import { currentCycleDay, maxCycleDays } from '@/data/mealStatus'

const route = useRoute()
const router = useRouter()

const isWeekRecord = computed(() => route.query.source === 'wuse-zhouji')
const selectedWeekDay = computed(() => (route.query.day === '2' ? '2' : '1'))
const currentScore = computed(() => getTodayRecordScore())
const currentStatusImage = computed(() => todayRecordStatusAssets[currentScore.value])
const isFinalDay = computed(() => currentCycleDay.value >= maxCycleDays)
const currentWeekRecordImage = computed(() =>
  selectedWeekDay.value === '2' ? todayRecordWeekDay2 : todayRecordWeekDay1,
)

const goToHome = () => {
  if (isWeekRecord.value) {
    router.push({ name: 'wuse-zhouji' })
    return
  }

  router.push(isFinalDay.value ? { name: 'game-ending' } : { name: 'home' })
}

const goBack = () => {
  router.push(isWeekRecord.value ? { name: 'wuse-zhouji' } : { name: 'bedtime-result' })
}
</script>

<template>
  <section class="scene-page today-record-page" aria-label="今日生活记录">
    <template v-if="isWeekRecord">
      <img class="scene-image" :src="currentWeekRecordImage" alt="今日生活记录" />
      <button class="today-record-back-action" type="button" aria-label="返回" @click="goBack" />
      <button class="today-record-complete-action" type="button" aria-label="完成今天" @click="goToHome" />
    </template>
    <template v-else>
      <img class="scene-image" :src="todayRecordBg" alt="今日生活记录背景" />
      <img class="scene-overlay today-record-status" :src="currentStatusImage" alt="今日生活记录状态" />
      <img class="scene-overlay today-record-back-image" :src="todayRecordBack" alt="" aria-hidden="true" />
      <img class="scene-overlay today-record-complete-image" :src="todayRecordComplete" alt="" aria-hidden="true" />
      <RouterLink class="today-record-back-action" :to="{ name: 'bedtime-result' }" aria-label="返回" />
      <button class="today-record-complete-action" type="button" aria-label="完成今天" @click="goToHome" />
    </template>
  </section>
</template>
