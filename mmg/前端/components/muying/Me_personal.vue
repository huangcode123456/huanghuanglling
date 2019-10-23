<template>
  <div>
  <ul>
      <li class="mh li">
        <label for="">我的头像</label>
        <img class="mhimg" src="../../img/default_photo.png" alt="">
        <input class="mhi" type="file">
        <span class="jt"></span>
      </li>
      <li class="li">
        <label for="">昵称</label>
        <input class="mhi1" value="778899" placeholder="请输入您的昵称">
        <span></span>
      </li>
      <li class="li">
        <label for="">性别</label>
        <span @click="show" ref="mhi2" class="mhi2">男</span>
        <span></span>
      </li>
      <li class="li">
        <label for="">手机号</label>
        <p class="mhi3">13512341234</p>
        <span></span>
      </li>
    </ul>
    <!-- 信息 end-->
    <!-- 按钮 start-->
    <div class="btnstyle">
      <button @click="save1">保存</button>
      <button @click="quit">退出登录</button>
    </div>
    <!-- 按钮 end-->
    <!--性别 s-->
    <div ref="sex" class="shadow-content">
      <p class="title">性别</p>
      <p @click="chose1" ref="sex_name" class="sex">男<span ref="sex_span1">√</span></p>
      <p @click="chose2" ref="sex_name1" class="sex">女<span ref="sex_span2">√</span></p>
    </div>
    <!--性别 e-->
    <!--阴影 s-->
    <div @click="chose" ref="sex_shadow" class="shadow"></div>
    <!--阴影 e-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      sex:'男',
    }
  },
  methods: {
    save1(){
      this.$messagebox("保存成功");
      this.$router.push("/Me")
    },
    quit(){
      sessionStorage.uid=""
      this.$messagebox("请登录");
      this.$router.push("/login")
    },
    chose(){
      this.$refs.sex.style.display="none";
      this.$refs.sex_shadow.style.display="none";
    },
    chose1(){
      this.sex=this.$refs.sex_name.innerHTML.slice(0,1)
      this.$refs.mhi2.innerHTML=this.sex
      this.$refs.sex.style.display="none";
      this.$refs.sex_shadow.style.display="none";
    },
    chose2(){
      this.sex=this.$refs.sex_name1.innerHTML.slice(0,1)
      this.$refs.mhi2.innerHTML=this.sex
      this.$refs.sex.style.display="none";
      this.$refs.sex_shadow.style.display="none";
    },
    show(){
      if(this.sex==="男"){
        this.$refs.sex_span2.style.display="none"
        this.$refs.sex_span1.style.display="block"
      }else if(this.sex==="女"){
        this.$refs.sex_span1.style.display="none"
        this.$refs.sex_span2.style.display="block"
      }
      this.$refs.sex.style.display="block";
      this.$refs.sex_shadow.style.display="block";
    }
  },
}
</script>
<style scoped>
*{margin:0;padding: 0;}
.li{display:block;}
.content{background-color: #eeeeee;height: 736px;}
ul{background-color: #ffffff;list-style: none;padding:0  30px;}
ul .mhimg{width: 40px;height: 40px;position: absolute;right: 50px;top: 5px;}
ul .li{border-bottom: 1px solid #eeeeee;height: 50px;line-height: 50px;}
label{margin-left: 10px;}
.mh{height: 70px;line-height: 70px;}
.mhi{position: absolute;left: 0;top: 0;width: 100%;height:70px; opacity: 0;z-index: 5;}
.mhi1{position: absolute;right: 60px;top:70px;border: none;text-align: right;font-size: 18px;}
.mhi2{display:inline-block;width:60%;position: absolute;right: 60px;top: 104px;height:45px;z-index: 5;text-align:right;}
.mhi3{position: absolute;right: 60px;top: 151px;height:70px;z-index: 5;}
button{width: 90%;border-radius: 5px;color: #000000;height: 48px;margin: 10px;background-color: #ffffff;border-style: none;font-size: 20px;}
.btnstyle{text-align: center;}
.btnstyle :first-child{color:#ffffff;background-color:#3091F2;}
.shadow{position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: black;opacity: .8;z-index: 99;display:none;}
.shadow-content{width: 80%;left: 8%;top: 50%;margin-top: -150px;padding: 3% 2%;
background-color: #fff;font-size: 14px;position: absolute;z-index: 100;display:none;}
.title{width:300px;height:42px;color: #41b80e;font-size:18px;border-bottom:2px solid #bcbcbc;line-height:42px;}
.sex{width:300px;height:40px;line-height:40px;margin-left:2%}
.sex span{color:#41b80e;margin-right:10px;float:right;display:none;}
</style>