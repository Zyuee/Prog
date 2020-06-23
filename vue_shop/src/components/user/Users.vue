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
          <el-button type="primary" @click="adddialogVisible=true" plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userlist" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改用户" placement="top-start" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="修改用户" placement="top-start" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserInfo(scope.row.id,scope.row.username)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
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
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogVisible" width="50%" @close="addDialogClose()">
      <!-- 内容主体区域，用于按钮添加用户 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="30%">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editorFormRef"
        label-width="70px"
        @click="editorDialogClosed()"
      >
        <el-form-item label="用户名称">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorUserInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证Email是否合法的规则
    // var checkEmail = (rule, value, callback) => {
    //   const emailRules = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //   if (emailRules.test(value)) {
    //     return callback();
    //   }
    //   callback(new error("请输入正确的邮箱！"));
    // };
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        return cb();
      }
      //返回一个错误提示
      cb(new Error("请输入合法的邮箱"));
    };
    //验证手机号码的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      //返回一个错误提示
      cb(new Error("请输入合法的手机号码"));
    };
    return {
      //获取用户列表的参数对象
      queryInfo: {
        //用户信息
        query: "",
        //当前的页数
        pagenum: 1,
        //当前每页记录数量
        pagesize: 2
      },
      total: 0,
      //存储getUserList()数据
      userlist: [],
      //添加用户按钮对话框
      adddialogVisible: false,
      //编辑用户按钮对话框
      editDialogVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          {
            validator: checkEmail,
            message: "邮箱格式不正确，请重新输入",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入用户电话号码", trigger: "blur" },
          {
            validator: checkMobile,
            message: "手机号码不正确，请重新输入",
            trigger: "blur"
          }
        ]
      },
      //存储编辑按钮返回数据
      editForm: {},
      //编辑表单中的规则
      editFormRules: {
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          {
            validator: checkEmail,
            message: "邮箱格式不正确，请重新输入",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入用户电话号码", trigger: "blur" },
          {
            validator: checkMobile,
            message: "手机号码不正确，请重新输入",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      // console.log(res);
      if (res.meta.status !== 200) return this.$message.error("获取数据失败");
      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    //监听 每页显示多少条记录
    handleSizeChange(newPagesize) {
      console.log(newPagesize);
      this.queryInfo.pagesize = newPagesize;
      this.getUserList();
    },
    //监听 页码值的变化
    handleCurrentChange(newPagenum) {
      this.queryInfo.pagenum = newPagenum;
      this.getUserList();
    },
    //监听 添加用户按钮关闭时的重置
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    //点击添加用户按钮进行预验证
    addUser() {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) {
          return;
        }
        //往服务端添加用户数据
        const { data: res } = await this.$http.post("/users", this.addForm);
        //判断如果添加失败，就做提示
        if (res.meta.status !== 201) return this.$message.error("添加用户失败");
        //添加成功的提示
        this.$message.success("添加用户成功");
        //关闭对话框
        this.adddialogVisible = false;
        //重新请求最新的数据
        this.getUserList();
      });
    },
    //展示编辑用户的对话框
    async showEditDialog(id) {
      //发送请求根据id获取用户信息
      const { data: res } = await this.$http.get("users/" + id);
      // console.log(res);
      //判断如果添加失败，就做提示
      if (res.meta.status !== 200)
        return this.$message.error("获取用户信息失败");
      //将获取到的数据保存到数据editForm中
      this.editForm = res.data;
      //显示弹出窗
      this.editDialogVisible = true;
    },
    //监听编辑对话框的关闭事件用于重置
    editorDialogClosed() {
      this.$refs.editorFormRef.resetFields();
    },
    //添加点击编辑用户对话框确定按钮并预验证
    editorUserInfo() {
      this.$refs.editorFormRef.validate(async vaild => {
        // console.log(vaild);
        //发起修改用户信息的请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          this.editForm
        );
        // console.log(res);
        if (res.meta.status !== 200) return this.$message.error("编辑失败！");
        // console.log("succeed!")
        //关闭对话框
        this.editDialogVisible = false;
        //刷新数据列表
        this.getUserList();
        //提示修改成功
        this.$message.success("更新用户信息成功");
      });
    },
    //删除用户的信息
    async removeUserInfo(id,name) {
      const confirmResult = await this.$confirm("是否将 "+name+" 删除", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err)
      // console.log(confirmResult)
      if(confirmResult != 'confirm'){
        return this.$message.info("已取消删除")
      }
      //删除的业务逻辑，delete
      const {data:res} = await this.$http.delete("users/"+id , id)

      if(res.meta.status != 200) return this.$message.error('删除 '+name+" 失败！")
      this.$message.success("删除成功 "+name+" !")
      //重新刷新数据列表
      this.getUserList();
    }
  }
};
</script>

<style lang="less" scoped>
</style>