// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App'
import router from './router'
import store from './store'
import './less/style.less'

Vue.use(VueResource)
Vue.use(VueLazyload, {
    error: require('./assets/loading.gif'),
    loading: require('./assets/loading.gif'),
    attempt: 1
  }
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
