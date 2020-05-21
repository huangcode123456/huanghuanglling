<template>
  <div class="jm-login-wrapper">
   
    <div class="login-box">
      <el-form ref="form" :model="form" >
        <el-form-item >
          <el-input 
            v-model="form.username" 
            placeholder="用户名">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            type="password"
            v-model="form.password" 
            placeholder="密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import apiUrl from '../../apiconfig.js'

export default {
  name: "login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    };
  },
  methods: {
    // login(){
    //   this.$router.push({path: '/dashboard'})
    // }
    async login() {
      if (!this.form.username.length) {
        this.$message.error('请输入用户名');
        return;
      }
      if (!this.form.password.length) {
        this.$message.error('请输入密码');
        return;
      }
      let rasPw = this.$getRsaCode(this.form.password); // ras 加密 密码 
      // console.log(rasPw)
      const res = await this.http.post(this.api.admin.login,{
          username:this.form.username,       
          password:rasPw
      });

      console.log(res);
      if (res.data.code === 200) {
        this.http.loginInit(res.data.data);
        setTimeout(() => {
          this.$router.push({path: '/dashboard'})
        }, 500)
      } else {
        this.$message.error(res.data.message);
      }
    },
  },
  created() {
    
  },
  components: {}
};
</script>
<style scoped lang="less">
  .jm-login-wrapper{
    height: 100vh;
    background: url(../../assets/images/bg-login.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
      width: 400px;
      padding: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, .95)
    }
  }
</style>

