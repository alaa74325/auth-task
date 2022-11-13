import { createWebHistory, createRouter } from "vue-router";
import Home from '../pages/index.vue';
import login from '../pages/login.vue';
import register from '../pages/register.vue';
import forget from '../pages/forget.vue';
import verfiy from '../pages/verfiy/_type';
const routes=[
    {
    name: 'Home',
    path: '/',
    component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
      path: '/verfiy/:type',
      name: 'verfiy',
      component: verfiy,
      props: true,
  },
  {
    path: '/forget',
    name: 'forget',
    component: forget
}

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;
