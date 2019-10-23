<template>
  <div>
    <mt-field label="手机号" placeholder="请输入手机号" v-model="phone" ></mt-field>
    <mt-button id="login" @click="login">注册</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone:[]
    }
  },
  methods: {
    login(){
      //功能：完成用户登录操作
      // 1.获取用户输入的电话
      var phone=this.phone;
      // 2.创建正则表达式
      var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
      // 3.验证用户手机
      if(!(reg.test(phone))){
        // 3.1 验证不成功提示消息
        this.$messagebox("手机号格式不正确");
        return;
      }
      // 4.发送ajax请求
      var url="reg"
      var obj={phone:phone};
      this.axios.get(url,{params:obj}).then(res=>{
        console.log(res.data.code)
        if(res.data.code=="1"){
          //如果成功，跳转主页面
          console.log("注册成功")
          this.$router.push("/login")
        }else if(res.data.code=="0"){
        }
      })
    }
  },
}
</script>
<style scoped>
*{margin:0;padding:0;}
#login{
  background-color: #08a2e8;
  color:#fff;
  margin-left:5%;
}
</style>