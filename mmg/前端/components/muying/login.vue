<template>
  <div>
    <mt-field label="手机号" placeholder="请输入手机号" v-model="phone" ></mt-field>
    <div>
      <mt-field label="验证码" placeholder="请输入验证码" v-model="inputyzm"><canvas id="c3" width="170" height="48" @click="change()"></canvas></mt-field>
    </div>
    <mt-button id="login" @click="login">登陆或注册</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone:[],
      yzm:[],
      inputyzm:[]
    }
  },
  mounted() {
    this.change()
  },
  methods: {
    change(){
      // 功能：点击更换验证码
      var c3 = document.getElementById("c3");
      console.log(c3)
      var ctx =c3.getContext("2d");
      var a = Math.floor(Math.random()*10);
      var b = Math.floor(Math.random()*10);
      var c = Math.floor(Math.random()*10);
      var d = Math.floor(Math.random()*10);
      this.yzm=a+""+b+""+c+""+d;
      //随机背景颜色
      var r= Math.floor(Math.random()*255)
      var g= Math.floor(Math.random()*255)
      var q= Math.floor(Math.random()*255)
      c3.style.background=`rgba(`+r+`,`+g+`,`+q+`,`+`0.6)`
      // console.log(abcd);
      // console.log(a);
      ctx.font="28px SimHei"
      ctx.clearRect(0,0,999,999);
      ctx.fillText(this.yzm,60,40);
    },
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
      // 3.2 验证码判断
      // 1.获取验证码
      var yzm=this.yzm;
      var inputyzm=this.inputyzm;
      // 2.判断
      if(!(inputyzm===yzm)){
        this.$messagebox("验证码不正确")
        return;
      }
      // 4.发送ajax请求
      var url="login";
      var obj={phone:phone};
      this.axios.get(url,{params:obj}).then(res=>{
        console.log(res)
        if(res.data.code=="1"){
          //如果成功，跳转主页面
          sessionStorage.uid=res.data.data[0].uid
          console.log("登陆成功",sessionStorage.uid)
          this.$router.push("/Bottom")
        }else if(res.data.code=="0"){//如果失败保存
          this.$messagebox("请注册");
          this.$router.push("/reg")
        }
      })
      },
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
#c3{width:120px;height:50px;}
</style>