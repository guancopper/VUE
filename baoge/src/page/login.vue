<template>
  <el-container>
<!--    <el-header>Header</el-header> -->
    <el-main>
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="50px" class="login-box" status-icon>
            <div class="demo-image">
              <el-image :src="require('../assets/logo.png')" style="width: 100px; height: 100px"></el-image>
            </div>
            <el-form-item label="账号" prop="username">
              <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
            </el-form-item>
            <el-form-item label-width="2px">
              <el-button type="primary" icon="el-icon-upload" v-on:click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
      </el-form>
      <div
        id="live2d"
        :style="{ zIndex }"
        @mouseover="toolShow=true"
        @mouseout="toolShow=false">
        <div v-show="mainShow">
          <div id="live2d-tip" v-html="tipText" v-show="tipShow"/>
          <canvas id="live2d-main" width="250" height="250"/>
          <div id="live2d-tool" v-show="toolShow">
            <span
              class="fa fa-lg"
              v-for="(tool, index) in tools"
              :key="index"
              :class="tool.name"
              @click="tool.click"/>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "Login",

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      dialogVisible: false,
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.form.username=="admin" && this.form.password=="123"){
            this.$notify({
                  message:'登录成功!',
                  type:'success',
                  duration: 3000
              })

            this.$router.push("/chart");
          }else{
            this.$message({
                    type: 'error',
                    message: '用户名或密码错误',
                    showClose: true
              })
          }
        }
        else {
          this.dialogVisible = true;
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
  .el-container{
    position: absolute;
    width: 100%;
    top: 0px ;
    left: 0 ;
    bottom: 0;
  }
  .el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    background-image: url(../assets/login.jpeg);
    background-size: cover;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .login-box {
      border: 1px solid #DCDFE6;
      width: 300px;
      margin: 20px auto;
      padding: 35px 35px 15px 35px;
      border-radius: 5px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      box-shadow: 0 0 25px #909399;
    }

  .login-title {
    text-align: center;
    margin: 0 auto 0px auto;
    color: #303133;
  }
</style>
