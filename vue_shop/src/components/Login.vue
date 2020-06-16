<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 注册区域 -->
            <div>
                <!-- 用户密码 -->
                <el-form :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_message">
                    <!-- 用户 -->
                    <el-form-item prop="userName">
                        <el-input v-model="loginForm.userName" prefix-icon="iconfont icon-user"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item >
                        <el-input v-model="loginForm.passWord" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                    </el-form-item>
                    <!-- 按钮区域 -->
                    <el-form-item class="btns">
                        <el-button type="primary" round>登录</el-button>
                        <el-button type="info" round>重置</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>   
    </div>
</template>

<script>
export default {
    data(){
        return{
            //这是登录表单的绑定对象
            loginForm:{
                userName:'czy',
                passWord:'123'
            },
            //验证表单的规则
            loginFormRules:{
                //验证用户名是否合法
                userName:[
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                passWord:[

                ]
            }

        }
    }
    
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: antiquewhite;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 120px;
    width: 120px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_message{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding:0 20px;
    box-sizing: border-box;
    
}
</style>