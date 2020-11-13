import Vue from 'vue';
import Router from 'vue-router';

import HelloVue from '@/pages/pageHelloVue/helloVue';
import ForgetPwd from '@/pages/pageForgetPwd/forgetPwd';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/helloVue',
  },
  {
    path: '/!',
    redirect: '/helloVue',
  },
  {
    title: 'helloVue',
    path: '/helloVue',
    name: 'helloVue',
    component: HelloVue,
  },
  {
    title: 'forget-password',
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: ForgetPwd,
  },
  {
    path: '*',
    redirect: '/helloVue',
  },
];

export default new Router({
  routes,
});
