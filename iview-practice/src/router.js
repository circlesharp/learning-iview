import VueRouter from 'vue-router'
import Button from './components/basic/button'
import Icon from './components/basic/icon'
import Grid from './components/basic/grid'
import LayoutBasic from './components/layout/basic'
import Layout_1 from './components/layout/layout-1'
import Layout_2 from './components/layout/layout-2'
import Layout_3 from './components/layout/layout-3'
import Input from './components/form/input'
import Radio from './components/form/radio'
import Checkbox from './components/form/checkbox'
import Switch from './components/form/switch'
import Modal from './components/others/modal'
import Table from './components/others/table'
import Table2 from './components/others/table2'
import Select from './components/others/select'
import Page from './components/union/page'
import openTrolley from './components/PageOpenTrolley/PageOpenTrolley.vue'

const routes = [
  { path: '/' },
  { path: '/basic/button', component: Button },
  { path: '/basic/icon', component: Icon },
  { path: '/basic/grid', component: Grid },
  { path: '/layout/basic', component: LayoutBasic },
  { path: '/layout/layout-1', component: Layout_1 },
  { path: '/layout/layout-2', component: Layout_2 },
  { path: '/layout/layout-3', component: Layout_3 },
  { path: '/form/input', component: Input },
  { path: '/form/radio', component: Radio },
  { path: '/form/checkbox', component: Checkbox },
  { path: '/form/switch', component: Switch },
  { path: '/others/modal', component: Modal },
  { path: '/others/table', component: Table },
  { path: '/others/table2', component: Table2 },
  { path: '/others/select', component: Select },
  { path: '/union/page', component: Page },
  { path: '/union/trolley', component: openTrolley },
]

const router = new VueRouter({
  routes
})

export { router }
