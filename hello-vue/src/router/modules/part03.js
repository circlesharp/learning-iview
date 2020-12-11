import Test07 from '@/pages/part03/pageTest07/Test07';
import Test09 from '@/pages/part03/pageTest09/Test09';

const part03 = [
  {
    path: '/part03',
    name: 'part03',
    redirect: '/part03/test07',
  },
  {
    title: 'test07',
    path: '/part03/test07',
    name: 'test07',
    component: Test07,
  },
  {
    title: 'test09',
    path: '/part03/test09',
    name: 'test09',
    component: Test09,
  },
];

export default part03;
