<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { applyStatusEffects, currentMealStatus, mealStatusRows } from '@/data/mealStatus'
import MealStatusBoard from '@/components/meal/MealStatusBoard.vue'
import { useMealFoodSlider } from '@/composables/useMealFoodSlider'
import { getMealFoodGroups, mealFoodActions } from '@/data/mealFoods'

const router = useRouter()
const mealStartStatus = { ...currentMealStatus.value }
const mealFoodGroups = getMealFoodGroups('night')

const selectedMealFoods = ref([])
const chosenMealFoods = ref([])
const isMealFinished = ref(false)
const hasAppliedMealStatus = ref(false)
const mealFoodPageSize = 5
const isSelectingMealFoods = computed(() => selectedMealFoods.value.length > 0)
const mealFoodSlots = [
  { left: 0.084, top: 0.846, width: 0.15, height: 0.076 },
  { left: 0.262, top: 0.846, width: 0.15, height: 0.076 },
  { left: 0.44, top: 0.846, width: 0.15, height: 0.076 },
  { left: 0.618, top: 0.846, width: 0.15, height: 0.076 },
  { left: 0.796, top: 0.846, width: 0.15, height: 0.076 },
]
const mealFoodFirstSlot = mealFoodSlots[0]
const mealFoodSlotStep = mealFoodSlots[1].left - mealFoodSlots[0].left
const selectedFoodPreview = computed(() => chosenMealFoods.value.slice(0, 5))
const {
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
} = useMealFoodSlider({
  selectedMealFoods,
  pageSize: mealFoodPageSize,
  slotStep: mealFoodSlotStep,
})
const selectMealFood = (foodType) => {
  selectedMealFoods.value = mealFoodGroups[foodType] ?? []
  resetMealFoodSlider()
  hasAppliedMealStatus.value = false
  isMealFinished.value = false
}

const resetMealSelection = () => {
  selectedMealFoods.value = []
  resetMealFoodSlider()
  hasAppliedMealStatus.value = false
  isMealFinished.value = false
}

const isFoodChosen = (foodId) => chosenMealFoods.value.some((food) => food.id === foodId)

const toggleMealFood = (food) => {
  hasAppliedMealStatus.value = false
  isMealFinished.value = false

  if (isFoodChosen(food.id)) {
    chosenMealFoods.value = chosenMealFoods.value.filter((chosenFood) => chosenFood.id !== food.id)
    return
  }

  chosenMealFoods.value = [...chosenMealFoods.value, food]
}

const finishMealSelection = () => {
  if (hasAppliedMealStatus.value) {
    router.push({ name: 'night-meal-feedback' })
    return
  }

  const mealEffects = {}

  chosenMealFoods.value.forEach((food) => {
    mealStatusRows.forEach((status) => {
      mealEffects[status.key] = (mealEffects[status.key] ?? 0) + (food.effects[status.key] ?? 0)
    })
  })

  applyStatusEffects(mealEffects, mealStartStatus)
  hasAppliedMealStatus.value = true
  isMealFinished.value = true
}
</script>

<template>
  <section class="scene-page night-meal-page" aria-label="night meal scene">
    <img
      class="scene-image"
      src="@/assets/night-meal/night-meal-bg.webp"
      alt="night meal background"
    />
    <img
      class="morning-overlay morning-meal-time"
      src="@/assets/night-meal-time.webp"
      alt="night meal time"
    />
    <img
      class="morning-overlay morning-meal-settings"
      src="@/assets/night-meal-settings.webp"
      alt="night meal settings"
    />
    <img
      class="morning-overlay morning-meal-character"
      src="@/assets/night-meal/night-meal-character.webp"
      alt="night meal character"
    />
    <MealStatusBoard />
    <template v-if="!isSelectingMealFoods">
      <img
        class="morning-overlay morning-meal-backdrop"
        src="@/assets/morning-meal-backdrop.webp"
        alt="morning meal backdrop"
      />
      <img
        class="morning-overlay morning-meal-food-board"
        src="@/assets/morning-meal-food-board-morning.webp"
        alt="morning meal food board"
      />
      <button
        v-for="action in mealFoodActions"
        :key="action.key"
        class="morning-meal-food-action"
        :class="action.className"
        type="button"
        :aria-label="`选择${action.name}`"
        @click="selectMealFood(action.key)"
      />
    </template>
    <template v-else>
      <img
        class="morning-overlay morning-meal-backdrop"
        src="@/assets/morning-meal-backdrop.webp"
        alt="morning meal backdrop"
      />
      <img
        class="morning-overlay morning-meal-panel morning-meal-panel-1"
        :class="{ 'is-dragging': isDraggingMealFoodSlider }"
        src="@/assets/morning-meal-panel-1.webp"
        :style="mealFoodSliderThumbStyle"
        alt="morning meal panel 1"
      />
      <img
        class="morning-overlay morning-meal-panel morning-meal-panel-2"
        src="@/assets/morning-meal-panel-2.webp"
        alt="morning meal panel 2"
      />
      <button
        class="morning-overlay morning-meal-panel morning-meal-panel-3"
        type="button"
        aria-label="完成食物选择"
        :disabled="!chosenMealFoods.length"
        @click="finishMealSelection"
      >
        <img
          class="morning-meal-panel-image"
          src="@/assets/morning-meal-panel-3.webp"
          alt="morning meal panel 3"
        />
      </button>
      <img
        class="morning-overlay morning-meal-panel morning-meal-panel-4"
        src="@/assets/morning-meal-panel-4.webp"
        alt="morning meal panel 4"
      />
      <img
        class="morning-overlay morning-meal-panel morning-meal-panel-5"
        src="@/assets/morning-meal-panel-5.webp"
        alt="morning meal panel 5"
      />
      <div class="morning-meal-food-slot-grid" aria-label="selected foods">
        <div
          class="morning-meal-food-viewport"
          :class="{ 'is-dragging': isDraggingMealFoodSlider }"
        >
          <div class="morning-meal-food-rail" :style="mealFoodRailStyle">
            <button
              v-for="(food, index) in selectedMealFoods"
              :key="food.id"
              class="morning-meal-food-slot"
              :class="{ 'is-selected': isFoodChosen(food.id) }"
              type="button"
              :style="{
                left: `${(mealFoodFirstSlot.left + mealFoodSlotStep * index) * 100}%`,
                top: `${mealFoodFirstSlot.top * 100}%`,
                width: `${mealFoodFirstSlot.width * 100}%`,
                height: `${mealFoodFirstSlot.height * 100}%`,
              }"
              :aria-label="`选择${food.name}`"
              @click="toggleMealFood(food)"
            >
              <img
                class="morning-meal-food-slot-image"
                :class="{ 'is-selected': isFoodChosen(food.id) }"
                :src="food.src"
                :alt="food.name"
              />
            </button>
          </div>
        </div>
        <button
          v-if="hasMultipleMealFoodPages"
          class="morning-meal-food-slider"
          :class="{ 'is-dragging': isDraggingMealFoodSlider }"
          type="button"
          role="slider"
          :aria-label="`拖动切换食物，当前第${mealFoodPageLabel}项`"
          :aria-valuenow="Math.round(mealFoodSliderProgress * 100)"
          aria-valuemin="0"
          aria-valuemax="100"
          @keydown.left.prevent="moveMealFoodSliderBy(-1)"
          @keydown.right.prevent="moveMealFoodSliderBy(1)"
          @pointerdown="startMealFoodSliderDrag"
          @pointermove="dragMealFoodSlider"
          @pointerup="stopMealFoodSliderDrag"
          @pointercancel="stopMealFoodSliderDrag"
        />
      </div>
      <button
        class="morning-meal-panel-3-action"
        type="button"
        :disabled="!chosenMealFoods.length"
        aria-label="完成食物选择"
        @click="finishMealSelection"
      />
      <button
        class="morning-meal-selection-back"
        type="button"
        aria-label="返回食物类别"
        @click="resetMealSelection"
      />
    </template>
    <div
      v-if="selectedFoodPreview.length"
      class="morning-meal-selected-preview"
      aria-label="已选食物"
    >
      <img
        v-for="food in selectedFoodPreview"
        :key="food.id"
        class="morning-meal-selected-preview-food"
        :src="food.src"
        :alt="food.name"
      />
    </div>
  </section>
</template>
