import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import ListBook from '@/components/ListBook'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/books',
      name: 'ListBook',
      component: ListBook
    }
  ],
  mode: 'history',
})
