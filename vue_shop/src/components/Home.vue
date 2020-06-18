<template>

    <el-container class="home_Container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>XX平台管理系统</span>
            </div>
            <el-button type="info" @click="logout">登出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
        <!-- 左侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu background-color="#333744"
                text-color="#fff"
                :unique-opened='true'
                :collapse="isCollapse"
                :collapse-transition="false"
                :router="true"
                active-text-color="#409EFF">
                <!-- 一级标题 -->
                    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <!-- 一级模板 -->
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级标题 -->
                        <el-menu-item :index="'/'+subItem.path+''" v-for="subItem in item.children" :key="subItem.id">
                            <!-- 二级模板 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                        
                    </el-submenu>
                </el-menu>
            </el-aside>
        <!-- 主体内容 -->
            <el-main>
                <!-- 占位符 -->
                <router-view></router-view>
                
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        //左侧菜单数据
      return {
          menuList:[],
          //用于判断是否要折叠
          isCollapse:false,
          //左侧栏的图标
          iconsObj: {
            '125': 'iconfont icon-user',
            '103': 'iconfont icon-tijikongjian',
            '101': 'iconfont icon-shangpin',
            '102': 'iconfont icon-danju',
            '145': 'iconfont icon-baobiao'
          },
      }  
    },
    created(){
        this.getMenuList();
    },
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        async getMenuList(){
            const {data:res} = await this.$http.get('menus');
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menuList = res.data
            console.log(res);
        },
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        }
    }
}
</script>

<style lang="less" scoped>
.home_Container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;//两端对齐
    padding-left: 0px;
    align-items: center;//button居中对齐
    color: #fff;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }

}
.el-aside{
    background-color: #333744;
    .el-menu {
    border-right: none;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #FFF;
}
}
.el-main{
    background-color: #eaedf1;
}
.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    color: azure;
    text-align: center;//内容的左右居中
    letter-spacing: 0.2em;//字母之间的距离
    cursor: pointer;

}
</style>
