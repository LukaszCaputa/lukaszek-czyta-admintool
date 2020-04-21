import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './static/sass/index.sass'

Vue.prototype.$axios = axios

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    console.log(this.$store)
    this.$store.dispatch('loadTagsAction') // dispatch loading
    this.$store.dispatch('loadBooksAction')
  }
}).$mount('#app')
