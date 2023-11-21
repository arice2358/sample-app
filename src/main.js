import { createApp } from 'vue'
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customTheme = {
  dark: false,
  colors: {
    primary: '#247CAC',
    secondary: '#89E7C0',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    accent: 'FBC9A0',
    error: '#B00020',
    info: '#000000',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      lighten: 2,
      lighten: 3,
      darken: 1,
      darken: 2,
      darken: 3,
    },
    themes: {
      customTheme,
    }
  }
})


createApp(App).use(vuetify).mount('#app')

