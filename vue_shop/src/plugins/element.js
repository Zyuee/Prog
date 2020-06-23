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
//面包屑导航
import {Breadcrumb,BreadcrumbItem,Card} from 'element-ui'
//导入布局
import {Row,Col} from 'element-ui'
//导入表格组件
import {Table,TableColumn} from 'element-ui'
//switch开关
import {Switch} from 'element-ui'
import {Tooltip} from 'element-ui'
//页码
import {Pagination} from 'element-ui'
import {Dialog} from 'element-ui'
//messageBox挂载，confirm函数特殊
import { MessageBox } from 'element-ui';

 


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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)

//message比较特殊
Vue.prototype.$message = Message
//messageBox特殊
Vue.prototype.$confirm = MessageBox.confirm
