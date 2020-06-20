import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'

import { router } from './router'

import 'view-design/dist/styles/iview.css'
// import './index.less'

Vue.config.productionTip = 

Vue.use(VueRouter)

Vue.use(ViewUI, {
  transfer: true,
  size: 'large',
  capture: false,
  select: {
    arrow: 'md-arrow-dropdown',
    arrorSize: 20
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
