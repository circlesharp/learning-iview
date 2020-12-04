/* 0. 导入Vue和VueRouter，并调用 Vue.use(VueRouter) */
import Vue from 'vue';
import Router from 'vue-router';

/* 1. 定义（引入）路由组件 */
import HelloVue from '@/pages/pageHelloVue/helloVue';
import ForgetPwd from '@/pages/pageForgetPwd/forgetPwd';
import Test01 from '@/pages/pageTest01/Test01';
import Test02 from '@/pages/pageTest02/Test02';
import Test03 from '@/pages/pageTest03/Test03';
import Test04 from '@/pages/pageTest04/Test04';
import Test05 from '@/pages/pageTest05/Test05';
import Test06 from '@/pages/pageTest06/Test06';
import Test06CompDef from '@/pages/pageTest06/components/compDefault';
import Test06Comp01 from '@/pages/pageTest06/components/comp01';
import Test06Comp02 from '@/pages/pageTest06/components/comp02';
import Test06Comp03 from '@/pages/pageTest06/components/comp03';

Vue.use(Router);

/* 2. 定义路由（routes） */
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
    path: '/test06/:id',
    component: Test06,
    children: [
      {
        path: '',
        component: Test06CompDef,
      },
      {
        // 当 /test06/:id/comp01 匹配成功
        // Test06Comp01 会被渲染在 test06 的 <router-view> 中
        path: 'comp01',
        component: Test06Comp01,
      },
      {
        path: 'comp02',
        component: Test06Comp02,
      },
      {
        path: 'comp03',
        component: Test06Comp03,
      },
    ],
  },
  {
    title: 'test06',
    path: '/test06*', // 匹配 /test06 开头的
    name: 'test06',
    component: Test06,
  },
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
