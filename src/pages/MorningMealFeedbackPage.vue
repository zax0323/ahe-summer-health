<template>
  <section class="scene-page morning-meal-feedback-page" aria-label="早餐反馈">
    <img class="scene-image" src="@/assets/morning-meal-feedback.webp" alt="早餐反馈" />
    <RouterLink
      class="morning-meal-feedback-continue-action"
      :to="{ name: 'forenoon-transition' }"
      aria-label="继续"
    />
  </section>
</template>
