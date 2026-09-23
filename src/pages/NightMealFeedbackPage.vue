<template>
  <section class="scene-page night-meal-feedback-page" aria-label="晚餐反馈">
    <img class="scene-image" src="@/assets/night-meal-feedback.webp" alt="晚餐反馈" />
    <RouterLink
      class="night-meal-feedback-continue-action"
      :to="{ name: 'bedtime-choice' }"
      aria-label="继续"
    />
  </section>
</template>
