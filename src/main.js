import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/iview.js'
import './assets/styles/init.scss'
import './assets/styles/public.scss'
import './assets/styles/iviewOverwrite.scss'
import './assets/styles/variables.scss'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
