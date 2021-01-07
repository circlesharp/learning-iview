import PageLog from '@/pages/memberCardManagement/PageLog/PageLog';
import PageMemberManagement from '@/pages/memberCardManagement/PageMemberManagement/PageMemberManagement';
import MemberModal from '../../pages/memberCardManagement/PageMemberManagement/components/multiModals/components/modalContent/class01-deposit.vue';
const memberCardManagement = [
  {
    path: '/memberCardManagement',
    name: 'memberCardManagement',
    redirect: '/memberCardManagement/memberManagement',
  },
  {
    title: 'log',
    path: '/memberCardManagement/log',
    name: 'PageLog',
    component: PageLog,
  },
  {
    title: 'memberManagement',
    path: '/memberCardManagement/memberManagement',
    name: 'PageMemberManagement',
    component: PageMemberManagement,
  },
  {
    title: 'memberManagement',
    path: '/memberCardManagement/memberModal',
    name: 'modal',
    component: MemberModal,
  },
];

export default memberCardManagement;
