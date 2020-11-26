import Vue from 'vue';
import Router from 'vue-router';

import HelloVue from '@/pages/pageHelloVue/helloVue';
import ForgetPwd from '@/pages/pageForgetPwd/forgetPwd';
import Test01 from '@/pages/pageTest01/Test';

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
    title: 'test01',
    path: '/test01',
    name: 'test01',
    component: Test01,
  },
  {
    path: '*',
    redirect: '/helloVue',
  },
];

export default new Router({
  routes,
});
