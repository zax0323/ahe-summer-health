import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { registerAppPlugins } from './app/plugins'
import { installRouteAssetPreloader } from './utils/routeAssetPreloader'
import './styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
registerAppPlugins(app)
installRouteAssetPreloader(router)
app.mount('#app')
