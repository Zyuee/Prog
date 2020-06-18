import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局的样式
import '../src/assets/global.css'
//导入图标
import './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'


//配置请求的路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios;
//配置请求头
axios.interceptors.request.use(config => {
  //为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  //留在最后的固定写法
  // console.log('config:')
  // console.log(config);
  return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
