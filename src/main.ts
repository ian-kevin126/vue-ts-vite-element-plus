import { createApp, Directive } from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store'
import baseComponent from './components'
import iconPark from './plugins/iconPark'
import loadComponent from './plugins/i18n'
import * as directives from './directives'
import './permission'
import 'normalize.css'
import 'element-plus/dist/index.css'
// import './styles/element-variables.scss'

const app = createApp(App)

// 自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

loadComponent(app)

app
  .use(store)
  .use(router)
  .use(baseComponent)
  .use(iconPark)
  .mount('#app')
