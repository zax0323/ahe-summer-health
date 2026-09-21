<template>
  <section class="scene-page lunch-meal-feedback-page" aria-label="午餐反馈">
    <img class="scene-image" src="@/assets/lunch-meal-feedback.png" alt="午餐反馈" />
    <RouterLink
      class="lunch-meal-feedback-continue-action"
      :to="{ name: 'afternoon-transition' }"
      aria-label="继续"
    />
  </section>
</template>
