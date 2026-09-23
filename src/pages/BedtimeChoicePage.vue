<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { advanceCycleDay, applyStatusEffects } from '@/data/mealStatus'
import {
  addBedtimeResultHistoryEntry,
  bedtimeChoiceOptions,
  getSavedBedtimeChoice,
  normalizeBedtimeChoiceId,
  setSavedBedtimeChoice,
} from '@/data/bedtimeResult'
import bedtimeChoiceScene from '@/assets/bedtime-choice/bedtime-choice-overall.webp'

const router = useRouter()

const sceneWidthPx = 1440
const sceneHeightPx = 3072

const createBoxStyle = ({ left, top, width, height }) => ({
  left: `calc((100vw - var(--scene-width)) / 2 + var(--scene-width) * ${left / sceneWidthPx})`,
  top: `calc((100vh - var(--scene-height)) / 2 + var(--scene-height) * ${top / sceneHeightPx})`,
  width: `calc(var(--scene-width) * ${width / sceneWidthPx})`,
  height: `calc(var(--scene-height) * ${height / sceneHeightPx})`,
})

const bedtimeChoiceBoxes = {
  read: { left: 84, top: 953, width: 604, height: 487 },
  chat: { left: 751, top: 953, width: 605, height: 487 },
  exercise: { left: 91, top: 1488, width: 604, height: 487 },
  device: { left: 751, top: 1488, width: 605, height: 487 },
  snack: { left: 91, top: 2025, width: 604, height: 487 },
  'stay-up': { left: 751, top: 2025, width: 605, height: 487 },
}

const bedtimeChoiceButtons = bedtimeChoiceOptions.map((option) => ({
  ...option,
  boxStyle: createBoxStyle(bedtimeChoiceBoxes[option.id]),
}))

const selectedChoiceId = ref(normalizeBedtimeChoiceId(getSavedBedtimeChoice()) ?? 'read')
const hasAppliedBedtimeChoice = ref(false)

const selectedChoice = computed(() =>
  bedtimeChoiceButtons.find((option) => option.id === selectedChoiceId.value) ?? null,
)

const selectBedtimeChoice = (choiceId) => {
  if (hasAppliedBedtimeChoice.value) {
    return
  }

  selectedChoiceId.value = choiceId
  setSavedBedtimeChoice(choiceId)
}

const confirmBedtimeChoice = () => {
  if (!selectedChoice.value || hasAppliedBedtimeChoice.value) {
    return
  }

  applyStatusEffects(selectedChoice.value.effects)
  addBedtimeResultHistoryEntry(selectedChoice.value.id)
  hasAppliedBedtimeChoice.value = true
  advanceCycleDay()
  router.push({ name: 'bedtime-result' })
}

const goBack = () => {
  if (hasAppliedBedtimeChoice.value) {
    return
  }

  router.push({ name: 'night-meal-feedback' })
}
</script>

<template>
  <section class="scene-page bedtime-choice-screen" aria-label="睡前活动选择">
    <img class="scene-image" :src="bedtimeChoiceScene" alt="睡前活动选择页" />
    <button
      class="bedtime-choice-back-action"
      type="button"
      aria-label="返回"
      @click="goBack"
    />
    <button
      v-for="option in bedtimeChoiceButtons"
      :key="option.id"
      class="bedtime-choice-option-action"
      :class="{ 'is-selected': selectedChoiceId === option.id }"
      type="button"
      :style="option.boxStyle"
      :aria-label="`选择${option.label}`"
      :aria-pressed="selectedChoiceId === option.id"
      @click="selectBedtimeChoice(option.id)"
    />
    <button
      class="bedtime-choice-confirm-action"
      type="button"
      aria-label="开启睡前活动"
      @click="confirmBedtimeChoice"
    />
  </section>
</template>

<style scoped>
.bedtime-choice-screen {
  position: relative;
}

.bedtime-choice-back-action,
.bedtime-choice-option-action,
.bedtime-choice-confirm-action {
  position: absolute;
  z-index: 3;
  display: block;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.bedtime-choice-back-action:focus-visible,
.bedtime-choice-option-action:focus-visible,
.bedtime-choice-confirm-action:focus-visible {
  outline: 0;
}

.bedtime-choice-back-action {
  left: calc((100vw - var(--scene-width)) / 2 + var(--scene-width) * 0.029);
  top: calc((100vh - var(--scene-height)) / 2 + var(--scene-height) * 0.016);
  width: calc(var(--scene-width) * 0.079);
  height: calc(var(--scene-height) * 0.036);
  border-radius: 999px;
}

.bedtime-choice-option-action {
  border-radius: 30px;
  transition:
    opacity 120ms ease,
    transform 120ms ease,
    filter 120ms ease;
}

.bedtime-choice-option-action:hover,
.bedtime-choice-option-action:focus-visible {
  outline: 0;
}

.bedtime-choice-option-action:active {
  opacity: 0.76;
  transform: translateY(calc(var(--scene-height) * 0.0015));
}

.bedtime-choice-option-action.is-selected {
  z-index: 4;
  box-shadow: inset 0 0 0 4px rgba(188, 150, 78, 0.18);
  filter: drop-shadow(0 0 calc(var(--scene-width) * 0.008) rgba(188, 150, 78, 0.18));
}

.bedtime-choice-confirm-action {
  left: calc((100vw - var(--scene-width)) / 2 + var(--scene-width) * 0.263);
  top: calc((100vh - var(--scene-height)) / 2 + var(--scene-height) * 0.904);
  width: calc(var(--scene-width) * 0.472);
  height: calc(var(--scene-height) * 0.044);
  border-radius: 28px;
}
</style>
