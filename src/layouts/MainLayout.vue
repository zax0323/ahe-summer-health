<template>
  <main class="route-stage">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page-transition" appear>
        <div class="route-screen" :key="route.fullPath">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
</template>
