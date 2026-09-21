import { ref } from 'vue'

const currentMealStatusStorageKey = 'vue-basic-starter:current-meal-status'
const currentCycleDayStorageKey = 'vue-basic-starter:current-cycle-day'

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage)

const readStorageJson = (key, fallback) => {
  if (!canUseStorage()) {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const writeStorageJson = (key, value) => {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export const mealStatusRows = [
  { key: 'appetite', name: '胃口', className: 'morning-meal-progress-appetite' },
  { key: 'energy', name: '体力', className: 'morning-meal-progress-energy' },
  { key: 'hydration', name: '水分', className: 'morning-meal-progress-hydration' },
  { key: 'mood', name: '心情', className: 'morning-meal-progress-mood' },
  { key: 'sleep', name: '睡眠', className: 'morning-meal-progress-sleep' },
]

export const baseMorningStatus = {
  appetite: 3,
  energy: 3,
  hydration: 3,
  mood: 3,
  sleep: 3,
}

export const minProgressLevel = 0
export const maxProgressLevel = 5
export const maxStatusDeltaPerStep = 1
export const maxCycleDays = 5
export const currentCycleDay = ref(readStorageJson(currentCycleDayStorageKey, 1))
export const currentMealStatus = ref({
  ...baseMorningStatus,
  ...readStorageJson(currentMealStatusStorageKey, {}),
})

export const clampProgressLevel = (level) =>
  Math.min(Math.max(level, minProgressLevel), maxProgressLevel)

export const clampStatusEffectDelta = (delta) =>
  Math.min(Math.max(delta, -maxStatusDeltaPerStep), maxStatusDeltaPerStep)

export const applyStatusEffects = (effects, baseStatus = currentMealStatus.value) => {
  const nextStatus = { ...baseStatus }

  mealStatusRows.forEach((status) => {
    nextStatus[status.key] = clampProgressLevel(
      (nextStatus[status.key] ?? baseMorningStatus[status.key]) +
        clampStatusEffectDelta(effects[status.key] ?? 0),
    )
  })

  currentMealStatus.value = nextStatus
  writeStorageJson(currentMealStatusStorageKey, nextStatus)
  return nextStatus
}

export const resetMealStatus = () => {
  currentMealStatus.value = { ...baseMorningStatus }
  currentCycleDay.value = 1
  writeStorageJson(currentMealStatusStorageKey, currentMealStatus.value)
  writeStorageJson(currentCycleDayStorageKey, currentCycleDay.value)
}

export const advanceCycleDay = () => {
  if (currentCycleDay.value >= maxCycleDays) {
    return false
  }

  currentCycleDay.value += 1
  writeStorageJson(currentCycleDayStorageKey, currentCycleDay.value)
  return true
}
