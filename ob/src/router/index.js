import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import before from '@/pages/before/index'
import after from '@/pages/after/index'
import miss from '@/pages/miss/index'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {path: '/', name:'before',component: before},
        // {path: 'after',name:'after', component: after},
        {path: 'after/:pair',name:'after', component: after},
      ]
    },
    { path: '*', name:'miss',component: miss }
  ]
})
