<template>
  <section class="card stack">
    <h1>项目分层说明</h1>
    <ul class="feature-list">
      <li><strong>app</strong>：应用级初始化、插件注册等。</li>
      <li><strong>components</strong>：可复用组件，按业务或 common 分组。</li>
      <li><strong>layouts</strong>：页面骨架，例如主布局、后台布局。</li>
      <li><strong>pages</strong>：路由页面组件。</li>
      <li><strong>router</strong>：路由表和导航守卫。</li>
      <li><strong>services</strong>：接口请求与后端 API 封装。</li>
      <li><strong>stores</strong>：Pinia 状态管理。</li>
      <li><strong>styles</strong>：全局样式、变量和重置。</li>
      <li><strong>utils</strong>：纯工具函数。</li>
    </ul>
  </section>
</template>
