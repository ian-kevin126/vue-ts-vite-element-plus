import { createApp } from 'vue'
const components = import.meta.glob('./base/*.vue')

export default (app: ReturnType<typeof createApp>) => {
  for (const path in components) {
    components[path]().then(mod => {
      if (mod.default.name) {
        app.component(mod.default.name, mod.default)
      }
    })
  }
}
