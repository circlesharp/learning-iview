import Vue from 'vue';
import Router from 'vue-router';

import HelloVue from '@/pages/pageHelloVue/helloVue';
import ForgetPwd from '@/pages/pageForgetPwd/forgetPwd';
import Test01 from '@/pages/pageTest01/Test01';
import Test02 from '@/pages/pageTest02/Test02';
import Test03 from '@/pages/pageTest03/Test03';
import Test04 from '@/pages/pageTest04/Test04';
import Test05 from '@/pages/pageTest05/Test05';

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
    title: 'test02',
    path: '/test02',
    name: 'test02',
    component: Test02,
  },
  {
    title: 'test03',
    path: '/test03',
    name: 'test03',
    component: Test03,
  },
  {
    title: 'test04',
    path: '/test04',
    name: 'test04',
    component: Test04,
  },
  {
    title: 'test05',
    path: '/test05',
    name: 'test05',
    component: Test05,
  },
  {
    path: '*',
    redirect: '/helloVue',
  },
];

export default new Router({
  routes,
});
