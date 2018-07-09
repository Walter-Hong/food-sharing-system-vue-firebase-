import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'


const Home = () => import('@/components/Home')
const Profile = () => import('@/components/User/Profile')
const Signup = () => import('@/components/User/Signup')
const Signin = () => import('@/components/User/Signin')
const ChatHome = () => import('@/components/Chat/ChatHome')
const Chat = () => import('@/components/Chat/Chat')
const Create = () => import('@/components/Chat/Create')

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'ChatHome',
      component: ChatHome,
      beforeEnter: AuthGuard
    },
    {
      path: '/chat/:id',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: '/createChat',
      name: 'CreateChat',
      component: Create,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
