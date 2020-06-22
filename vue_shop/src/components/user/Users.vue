<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>

        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <!-- 搜索区域 -->
            <el-row :gutter="20">
                <el-col :span="10">
                    <!-- 搜索框 -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <!-- 添加用户按钮 -->
                    <el-button type="primary" plain>添加用户</el-button>
                </el-col>        
            </el-row>
            <!-- 用户列表 -->
            <el-table :data='userlist' stripe border>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态" prop="mg_state">
                    <!-- 插槽 -->
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66">
                        </el-switch>                        
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <!-- 插槽 -->
                    <template slot-scope="scope">
                        <!-- 修改 -->
                        <el-tooltip effect="dark" content="修改用户" placement="top-start" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        </el-tooltip>
                        <!-- 删除 -->
                        <el-tooltip effect="dark" content="修改用户" placement="top-start" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </el-tooltip>
                        <!-- 分配角色 -->
                        <el-tooltip effect="dark" content="修改用户" placement="top-start" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>                  
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>

    </div>
</template>

<script>
export default {
    data(){
        return {
            //获取用户列表的参数对象
            queryInfo:{
                //用户信息
                query:'',
                //当前的页数
                pagenum:1,
                //当前每页记录数量
                pagesize:2
            },
            total:0,
            userlist:[]
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
            const {data:res} = await this.$http.get('users',{params : this.queryInfo})
            console.log(res)
            if(res.meta.status !== 200) return this.$message.error('获取数据失败')
            this.userlist = res.data.users
            this.total = res.data.total
        },
        //监听 每页显示多少条记录
        handleSizeChange(newPagesize){
            console.log(newPagesize)
            this.queryInfo.pagesize = newPagesize
            this.getUserList()

        },
        //监听 页码值的变化
        handleCurrentChange(newPagenum){
            this.queryInfo.pagenum = newPagenum
            this.getUserList()
        }

    }
    
}
</script>

<style lang="less" scoped>

</style>