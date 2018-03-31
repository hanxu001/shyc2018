import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import help from '@/pages/help/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {path: '/', component: help},
      ]
    }
  ]
})
