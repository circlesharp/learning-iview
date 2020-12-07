/* 0. 导入Vue和VueRouter，并调用 Vue.use(VueRouter) */
import Vue from 'vue';
import Router from 'vue-router';

/* 1. 定义（引入）路由组件 */
import HelloVue from '@/pages/pageHelloVue/helloVue';
import ForgetPwd from '@/pages/pageForgetPwd/forgetPwd';

import part01 from './modules/part01';
import part02 from './modules/part02';
import part03 from './modules/part03';

Vue.use(Router);

/* 2. 定义路由（routes） */
const parts = [...part01, ...part02, ...part03];

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
  ...parts,
  {
    path: '*',
    redirect: '/helloVue',
  },
];

/* 3. 创建 router 实例，传入 routes 配置 */
const router = new Router({
  routes,
});

/* 4. 创建和挂载根实例，通过 router 参数注入路由 */
/* const app = new Vue({ router }).$mount('#app); */

export default router;
