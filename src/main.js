import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import * as filters from './filters'

Vue.config.productionTip = false

Vue.mixin(mixins) // global mixin

Object.keys(filters).forEach(key => { // global filters
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
