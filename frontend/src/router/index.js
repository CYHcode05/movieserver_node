import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import UserHome from '../views/UserHome.vue'
import Searchmovie from '../views/Searchmovie.vue'
import onemovie from '../views/onemovie.vue'
import membership from '../views/membership.vue'
import manager from '../views/manager.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'userHome',
        component: UserHome
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/membership',
      name: 'membership',
      component: membership

    },

    {
      path: '/onemovie/:id',
      name: 'onemovie',
      component: onemovie,
      props: true
    },
    
    {
      path: '/searchmovie/:name',
      name: 'searchmovie',
      component: Searchmovie,
      props: true
    },

    {
      path: '/manager',
      name: 'manager',
      component: manager
    },
    
    {
      path: '/userhome',
      name: 'userhome',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/UserHome.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
