import { createApp } from 'vue'
import i18n from '@/locales'

export default function loadComponent(app: ReturnType<typeof createApp>) {
  app.use(i18n)
}
