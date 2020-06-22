import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users'


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/home',
    component:Home,
    redirect:'/Welcome',
    children:[
      {path:'/Welcome',component:Welcome},
      {path:'/users',component:Users}
    ]
  }
  
  
]

const router = new VueRouter({
  routes
});

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表产品卖给哪个路径来
  // next 是一个函数，用于放行或跳转
  // next() 放行；；；next('/login') 强制跳转登录
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if(!tokenStr){return next('/login');}
  next();
});
export default router
