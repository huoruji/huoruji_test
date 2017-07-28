import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
import RankList from '@/components/RankList'

Vue.use(Router)

const  routes = [
    {
      path: '/rank/:id',
      name: 'rank',
      component: RankList
    }
  ]

export default new Router({
  routes,
  //只在history模式下有用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
