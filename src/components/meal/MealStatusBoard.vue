<template>
  <div
    class="meal-status-board"
    aria-label="状态栏"
  >
    <img
      class="meal-status-layer"
      :src="statusFrame"
      alt=""
      aria-hidden="true"
    >
    <img
      v-for="row in statusOverlayRows"
      :key="row.key"
      class="meal-status-layer meal-status-progress-image"
      :src="statusProgress100"
      :style="row.style"
      :alt="row.alt"
      aria-hidden="true"
    >
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentMealStatus, mealStatusRows, maxProgressLevel, minProgressLevel } from '@/data/mealStatus'
import statusFrame from '@/assets/meal-status/status-frame.png'
import statusProgress100 from '@/assets/meal-status/status-progress-100.png'

const sceneWidth = 1440
const sceneHeight = 3072
const rowCenters = [392, 485, 583, 678, 773]
const progressAssetCenterY = 894
const progressFillStartX = 460
const progressFillEndX = 1156

const clampLevel = (level) => Math.min(Math.max(level, minProgressLevel), maxProgressLevel)

const statusOverlayRows = computed(() =>
  mealStatusRows.map((status, index) => {
    const level = clampLevel(currentMealStatus.value[status.key] ?? minProgressLevel)
    const progressRatio = (level - minProgressLevel) / (maxProgressLevel - minProgressLevel)
    const progressEndX = progressFillStartX + (progressFillEndX - progressFillStartX) * progressRatio
    const rightInsetRatio = (sceneWidth - progressEndX) / sceneWidth
    const offsetRatio = (rowCenters[index] - progressAssetCenterY) / sceneHeight

    return {
      key: status.key,
      alt: `${status.name}${level * 20}%`,
      style: {
        '--status-y-offset': `${offsetRatio * 100}%`,
        '--status-right-inset': `${rightInsetRatio * 100}%`,
      },
    }
  }),
)
</script>
