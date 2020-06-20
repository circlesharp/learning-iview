import VueRouter from 'vue-router'
import Button from './components/button'
import Icon from './components/icon'
import Grid from './components/grid'

const routes = [
  { path: '/' },
  { path: '/button', component: Button },
  { path: '/icon', component: Icon },
  { path: '/grid', component: Grid },
]

const router = new VueRouter({
  routes
})

export { router }
