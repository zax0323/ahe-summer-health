<template>
  <section class="scene-page food-book-page" aria-label="food book scene">
    <img class="scene-image" src="@/assets/food-book-bg.webp" alt="food book" />
    <img class="scene-overlay food-book-back-overlay" src="@/assets/food-book-back-overlay.webp" alt="back" />
    <RouterLink
      class="food-book-action food-book-action-back"
      to="/"
      aria-label="back to home"
    ></RouterLink>
    <RouterLink
      class="food-book-action food-book-action-atlas"
      to="/food-atlas"
      aria-label="food atlas button"
    ></RouterLink>
    <RouterLink
      class="food-book-action food-book-action-summer-note"
      to="/summer-note"
      aria-label="summer note button"
    ></RouterLink>
  </section>
</template>
