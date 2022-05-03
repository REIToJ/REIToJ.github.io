import { createRouter, createWebHistory } from 'vue-router';
import SignInView from '../views/SignInView.vue';
import HomeView from '../views/Home.vue';

const routes = [
 {
   path: '/sign-in',
   name: 'sign-in',
   component: SignInView,
 },

 {
  path: '/sign-up',
  name: 'sign-up',
  component: () => import ("@/views/SignUpView"),
},
  
  {
    path: '/',
    name: 'home',
    component: () => import ("@/views/Home"),
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
