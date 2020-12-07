import Vue from 'vue';
import iView from 'iview';
import utils from '@/utils';

import 'iview/dist/styles/iview.css';

import router from '@/router';
import App from './App.vue';

Vue.use(iView);
Vue.config.productionTip = false;

Vue.prototype.checkRequestParams = utils.checkRequestParams;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
