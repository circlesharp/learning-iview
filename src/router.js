import VueRouter from 'vue-router'
import Button from './components/button'
import Icon from './components/icon'
import Grid from './components/grid'
import LayoutBasic from './components/layout/basic'
import Layout_1 from './components/layout/layout-1'
import Layout_2 from './components/layout/layout-2'
import Layout_3 from './components/layout/layout-3'

const routes = [
  { path: '/' },
  { path: '/button', component: Button },
  { path: '/icon', component: Icon },
  { path: '/grid', component: Grid },
  { path: '/layout/basic', component: LayoutBasic },
  { path: '/layout/layout-1', component: Layout_1 },
  { path: '/layout/layout-2', component: Layout_2 },
  { path: '/layout/layout-3', component: Layout_3 },
]

const router = new VueRouter({
  routes
})

export { router }
