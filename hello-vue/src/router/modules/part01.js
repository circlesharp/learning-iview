import Test01 from '@/pages/part01/pageTest01/Test01';
import Test02 from '@/pages/part01/pageTest02/Test02';
import Test03 from '@/pages/part01/pageTest03/Test03';
import Test04 from '@/pages/part01/pageTest04/Test04';
import Test05 from '@/pages/part01/pageTest05/Test05';

const part01 = [
  {
    path: '/part01',
    name: 'part01',
    redirect: '/part01/test01',
  },
  {
    title: 'test01',
    path: '/part01/test01',
    name: 'test01',
    component: Test01,
  },
  {
    title: 'test02',
    path: '/part01/test02',
    name: 'test02',
    component: Test02,
  },
  {
    title: 'test03',
    path: '/part01/test03',
    name: 'test03',
    component: Test03,
  },
  {
    title: 'test04',
    path: '/part01/test04',
    name: 'test04',
    component: Test04,
  },
  {
    title: 'test05',
    path: '/part01/test05',
    name: 'test05',
    component: Test05,
  },
];

export default part01;
