import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Copclass from '@/components/EnterPage'
import login from '@/page/login'
import layout from '@/page/layout'
import chart from '@/page/chart'
import fanGroup from '@/page/fanGroup'
import excle from '@/page/excle'
import table from '@/page/table'
import get from '@/page/get'
import tj_chart from '@/page/Tj_chart'
import chartNo from '@/page/chartNo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/view/',
      name: 'layout',
      component: layout,
      children:[
        {
          path: '/chart',
          name: 'chart',
          component: chart
        },
        {
          path: '/chartNo',
          name: 'chartNo',
          component: chartNo
        },
        {
          path: '/fanGroup',
          name: 'fanGroup',
          component: fanGroup
        },
        {
          path: '/excle',
          name: 'excle',
          component: excle
        },
        {
          path: '/',
          name: 'get',
          component: get
        }
      ]
    }
  ]
})
