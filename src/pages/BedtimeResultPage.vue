<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  bedtimeResultStatusAssets,
  getSavedBedtimeChoice,
  resolveBedtimeResult,
} from '@/data/bedtimeResult'
import bedtimeResultBg from '@/assets/bedtime-result/bg.webp'
import bedtimeResultTitle from '@/assets/bedtime-result/title.webp'
import bedtimeResultBack from '@/assets/bedtime-result/back.webp'
import bedtimeResultRecord from '@/assets/bedtime-result/record.webp'

const router = useRouter()

const currentChoiceId = computed(() => getSavedBedtimeChoice() ?? 'read')
const currentResult = computed(() => resolveBedtimeResult(currentChoiceId.value))
const currentStatusImage = computed(() => bedtimeResultStatusAssets[currentResult.value.status])

const goToRecords = () => {
  router.push({ name: 'today-record' })
}
</script>

<template>
  <section class="scene-page bedtime-result-page" aria-label="入睡结果">
    <img class="scene-image" :src="bedtimeResultBg" alt="入睡结果背景" />
    <img class="scene-overlay bedtime-result-status" :src="currentStatusImage" alt="入睡结果状态" />
    <img class="scene-overlay bedtime-result-title" :src="bedtimeResultTitle" alt="" aria-hidden="true" />
    <img class="scene-overlay bedtime-result-back-image" :src="bedtimeResultBack" alt="" aria-hidden="true" />
    <img class="scene-overlay bedtime-result-record-image" :src="bedtimeResultRecord" alt="" aria-hidden="true" />
    <RouterLink class="bedtime-result-back-action" :to="{ name: 'bedtime-choice' }" aria-label="返回" />
    <button class="bedtime-result-record-action" type="button" aria-label="查看今日记录" @click="goToRecords" />
  </section>
</template>
