import Test06 from '@/pages/part02/pageTest06/Test06';
import Test06CompDef from '@/pages/part02/pageTest06/components/compDefault';
import Test06Comp01 from '@/pages/part02/pageTest06/components/comp01';
import Test06Comp02 from '@/pages/part02/pageTest06/components/comp02';
import Test06Comp03 from '@/pages/part02/pageTest06/components/comp03';
import Test08 from '@/pages/part02/pageTest08/Test08';
import Test08Comp01 from '@/pages/part02/pageTest08/components/comp01';
import Test08Comp02 from '@/pages/part02/pageTest08/components/comp02';
import Test08Comp03 from '@/pages/part02/pageTest08/components/comp03';

const part02 = [
  {
    path: '/part02',
    name: 'part02',
    redirect: '/part02/test06',
  },
  {
    path: '/part02/test06/:id',
    component: Test06,
    name: 'test06',
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
    path: '/part02/test06*', // 匹配 /test06 开头的
    name: 'test06',
    component: Test06,
  },
  {
    path: '/part02/test08',
    name: 'test08',
    components: {
      header: Test08Comp01,
      sidebar: Test08Comp02,
      content: Test08Comp03,
    },
  },
];

export default part02;
