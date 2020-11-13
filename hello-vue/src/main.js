import Vue from 'vue';
import iView from 'iview';

import 'iview/dist/styles/iview.css';

import App from './App.vue';
import router from '@/router';

Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
