import bedtimeResultGood from '@/assets/bedtime-result/status-1-good.webp'
import bedtimeResultNormal from '@/assets/bedtime-result/status-2-normal.webp'
import bedtimeResultPoor from '@/assets/bedtime-result/status-3-poor.webp'

const bedtimeChoiceStorageKey = 'vue-basic-starter:bedtime-choice'
const bedtimeHistoryStorageKey = 'vue-basic-starter:bedtime-result-history'

const bedtimeChoiceAliases = {
  game: 'device',
  read: 'read',
  exercise: 'exercise',
  'stay-up': 'stay-up',
  sleep: 'read',
}

const bedtimeResultByChoice = {
  read: {
    choiceLabel: '看书',
    status: 1,
    statusLabel: '状态很好',
  },
  chat: {
    choiceLabel: '聊天',
    status: 2,
    statusLabel: '状态一般',
  },
  exercise: {
    choiceLabel: '运动',
    status: 2,
    statusLabel: '状态一般',
  },
  device: {
    choiceLabel: '使用电子设备',
    status: 3,
    statusLabel: '状态较差',
  },
  snack: {
    choiceLabel: '吃夜宵',
    status: 3,
    statusLabel: '状态较差',
  },
  'stay-up': {
    choiceLabel: '通宵',
    status: 3,
    statusLabel: '状态较差',
  },
}

const bedtimeChoiceIds = new Set(Object.keys(bedtimeResultByChoice))

export const bedtimeChoiceLabels = Object.fromEntries(
  Object.entries(bedtimeResultByChoice).map(([choiceId, result]) => [choiceId, result.choiceLabel]),
)

export const bedtimeChoiceEffects = {
  read: { appetite: 0, energy: 0, hydration: 0, mood: 1, sleep: 1 },
  chat: { appetite: 0, energy: 0, hydration: 0, mood: 1, sleep: 0 },
  exercise: { appetite: 0, energy: -1, hydration: -1, mood: 1, sleep: 1 },
  device: { appetite: 0, energy: -1, hydration: 0, mood: 0, sleep: -1 },
  snack: { appetite: 1, energy: 0, hydration: -1, mood: 0, sleep: -1 },
  'stay-up': { appetite: -1, energy: -1, hydration: -1, mood: -1, sleep: -1 },
}

export const normalizeBedtimeChoiceId = (choiceId) => {
  if (!choiceId) {
    return null
  }

  return bedtimeChoiceIds.has(choiceId) ? choiceId : bedtimeChoiceAliases[choiceId] ?? null
}

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

export const bedtimeChoiceOptions = Object.entries(bedtimeChoiceLabels).map(([id, label]) => ({
  id,
  label,
  effects: bedtimeChoiceEffects[id],
}))

export const bedtimeChoiceCardMap = bedtimeChoiceIds

export const bedtimeChoiceResultFor = (choiceId) => {
  const normalizedChoiceId = normalizeBedtimeChoiceId(choiceId) ?? 'read'
  return bedtimeResultByChoice[normalizedChoiceId] ?? bedtimeResultByChoice.read
}

export const bedtimeResultStatusAssets = {
  1: bedtimeResultGood,
  2: bedtimeResultNormal,
  3: bedtimeResultPoor,
}

export const getSavedBedtimeChoice = () => {
  if (!canUseStorage()) {
    return null
  }

  const storedChoiceId = window.localStorage.getItem(bedtimeChoiceStorageKey)
  const normalizedChoiceId = normalizeBedtimeChoiceId(storedChoiceId)

  if (normalizedChoiceId && normalizedChoiceId !== storedChoiceId) {
    window.localStorage.setItem(bedtimeChoiceStorageKey, normalizedChoiceId)
  }

  return normalizedChoiceId
}

export const setSavedBedtimeChoice = (choiceId) => {
  if (!canUseStorage()) {
    return
  }

  const normalizedChoiceId = normalizeBedtimeChoiceId(choiceId)

  if (!normalizedChoiceId) {
    window.localStorage.removeItem(bedtimeChoiceStorageKey)
    return
  }

  window.localStorage.setItem(bedtimeChoiceStorageKey, normalizedChoiceId)
}

export const resolveBedtimeResult = (choiceId) => bedtimeChoiceResultFor(choiceId)

export const getBedtimeResultHistory = () => readStorageJson(bedtimeHistoryStorageKey, [])

export const addBedtimeResultHistoryEntry = (choiceId) => {
  const normalizedChoiceId = normalizeBedtimeChoiceId(choiceId) ?? 'read'
  const result = bedtimeChoiceResultFor(normalizedChoiceId)
  const history = getBedtimeResultHistory()
  const entry = {
    choiceId: normalizedChoiceId,
    choiceLabel: result.choiceLabel,
    status: result.status,
    statusLabel: result.statusLabel,
    timestamp: new Date().toISOString(),
  }

  history.unshift(entry)
  writeStorageJson(bedtimeHistoryStorageKey, history.slice(0, 12))
  return entry
}
