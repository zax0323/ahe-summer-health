import { computed, ref } from 'vue'

const trackStartRatio = 0.0688
const trackEndRatio = 0.9424
const thumbTravelRatio = 0.7667
const sceneAspectRatio = 1440 / 3072

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const useMealFoodSlider = ({ selectedMealFoods, pageSize, slotStep }) => {
  const mealFoodSliderProgress = ref(0)
  const isDraggingMealFoodSlider = ref(false)
  let pendingProgress = null
  let animationFrameId = 0

  const maxMealFoodScrollIndex = computed(() =>
    Math.max(selectedMealFoods.value.length - pageSize, 0),
  )
  const hasMultipleMealFoodPages = computed(() => maxMealFoodScrollIndex.value > 0)
  const nearestMealFoodScrollIndex = computed(() =>
    Math.round(mealFoodSliderProgress.value * maxMealFoodScrollIndex.value),
  )
  const mealFoodScrollIndex = computed(() =>
    clamp(nearestMealFoodScrollIndex.value, 0, maxMealFoodScrollIndex.value),
  )
  const mealFoodPageLabel = computed(
    () => `${mealFoodScrollIndex.value + 1}/${maxMealFoodScrollIndex.value + 1}`,
  )
  const mealFoodRailStyle = computed(() => ({
    '--meal-food-scroll': -mealFoodScrollIndex.value * slotStep,
  }))
  const mealFoodSliderThumbStyle = computed(() => ({
    '--meal-food-thumb-x': mealFoodSliderProgress.value * thumbTravelRatio,
  }))

  const commitProgress = () => {
    animationFrameId = 0

    if (pendingProgress === null) {
      return
    }

    mealFoodSliderProgress.value = pendingProgress
    pendingProgress = null
  }

  const scheduleProgress = (progress) => {
    pendingProgress = progress

    if (!animationFrameId) {
      animationFrameId = window.requestAnimationFrame(commitProgress)
    }
  }

  const updateSliderFromClientX = (clientX) => {
    if (!hasMultipleMealFoodPages.value) {
      mealFoodSliderProgress.value = 0
      return
    }

    const sceneWidth = Math.min(window.innerWidth, window.innerHeight * sceneAspectRatio)
    const sceneLeft = (window.innerWidth - sceneWidth) / 2
    const trackStart = sceneLeft + sceneWidth * trackStartRatio
    const trackEnd = sceneLeft + sceneWidth * trackEndRatio

    scheduleProgress(clamp((clientX - trackStart) / (trackEnd - trackStart), 0, 1))
  }

  const startMealFoodSliderDrag = (event) => {
    if (!hasMultipleMealFoodPages.value) {
      return
    }

    event.preventDefault()
    isDraggingMealFoodSlider.value = true
    event.currentTarget.setPointerCapture?.(event.pointerId)
    updateSliderFromClientX(event.clientX)
  }

  const dragMealFoodSlider = (event) => {
    if (!isDraggingMealFoodSlider.value) {
      return
    }

    updateSliderFromClientX(event.clientX)
  }

  const stopMealFoodSliderDrag = (event) => {
    if (!isDraggingMealFoodSlider.value) {
      return
    }

    isDraggingMealFoodSlider.value = false
    pendingProgress = null
    mealFoodSliderProgress.value = hasMultipleMealFoodPages.value
      ? mealFoodScrollIndex.value / maxMealFoodScrollIndex.value
      : 0
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const moveMealFoodSliderBy = (direction) => {
    if (!hasMultipleMealFoodPages.value) {
      return
    }

    const nextIndex = clamp(
      Math.round(mealFoodScrollIndex.value) + direction,
      0,
      maxMealFoodScrollIndex.value,
    )
    mealFoodSliderProgress.value = nextIndex / maxMealFoodScrollIndex.value
  }

  const resetMealFoodSlider = () => {
    mealFoodSliderProgress.value = 0
    pendingProgress = null
  }

  return {
    dragMealFoodSlider,
    hasMultipleMealFoodPages,
    isDraggingMealFoodSlider,
    mealFoodPageLabel,
    mealFoodRailStyle,
    mealFoodSliderProgress,
    mealFoodSliderThumbStyle,
    moveMealFoodSliderBy,
    resetMealFoodSlider,
    startMealFoodSliderDrag,
    stopMealFoodSliderDrag,
  }
}
