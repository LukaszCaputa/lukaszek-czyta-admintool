import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tags from '../views/Tags.vue'
import BookDetail from '../components/BookDetail.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags
    },
    {
      path: '/book/:bookId',
      name: 'bookDetail',
      component: BookDetail
    }
  ]
})
