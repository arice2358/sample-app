import { createApp } from 'vue'
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


createApp(App).use(vuetify).mount('#app')

