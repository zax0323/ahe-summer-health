<template>
  <section class="scene-page afternoon-feedback-page" aria-label="下午反馈">
    <img class="scene-image" src="@/assets/afternoon-feedback.png" alt="下午反馈" />
    <RouterLink
      class="afternoon-feedback-dinner-action"
      :to="{ name: 'night-meal' }"
      aria-label="去准备晚餐"
    />
  </section>
</template>
