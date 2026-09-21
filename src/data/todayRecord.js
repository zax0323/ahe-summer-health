import { currentMealStatus, mealStatusRows } from '@/data/mealStatus'
import { getSavedBedtimeChoice, resolveBedtimeResult } from '@/data/bedtimeResult'
import todayRecordStatusGood from '@/assets/today-record/status-1-good.png'
import todayRecordStatusMid from '@/assets/today-record/status-2-mid.png'
import todayRecordStatusBad from '@/assets/today-record/status-3-bad.png'

export const todayRecordStatusAssets = {
  1: todayRecordStatusGood,
  2: todayRecordStatusMid,
  3: todayRecordStatusBad,
}

export const getTodayRecordScore = () => {
  const mealValues = mealStatusRows.map((row) => currentMealStatus.value[row.key] ?? 3)
  const mealAverage = mealValues.reduce((sum, value) => sum + value, 0) / mealValues.length
  const bedtimeStatus = resolveBedtimeResult(getSavedBedtimeChoice() ?? 'read').status
  const bedtimeWeight = bedtimeStatus === 1 ? 0.4 : bedtimeStatus === 2 ? 0 : -0.5
  const finalScore = mealAverage + bedtimeWeight

  if (finalScore >= 4) {
    return 1
  }

  if (finalScore >= 2.8) {
    return 2
  }

  return 3
}
