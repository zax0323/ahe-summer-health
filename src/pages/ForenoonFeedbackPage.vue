<template>
  <section class="scene-page forenoon-feedback-page" aria-label="上午反馈">
    <img class="scene-image" src="@/assets/forenoon-feedback.webp" alt="上午反馈" />
    <RouterLink
      class="forenoon-feedback-lunch-action"
      :to="{ name: 'lunch-meal' }"
      aria-label="去准备午餐"
    />
  </section>
</template>
