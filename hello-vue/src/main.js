import Vue from 'vue';
import iView from 'iview';

import 'iview/dist/styles/iview.css';

import router from '@/router';
import App from './App.vue';

Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
