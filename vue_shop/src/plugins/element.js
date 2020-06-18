import Vue from 'vue'
import { Button } from 'element-ui'
import {Form,FormItem} from 'element-ui'
import {Input} from 'element-ui'
//导入message消息提示
import {Message} from 'element-ui'
//导入容器布局
import {Header,Aside,Main,Container} from 'element-ui'
//NavMenu导航菜单
import {Menu,Submenu,MenuItemGroup,MenuItem} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
//message比较特殊
Vue.prototype.$message = Message
