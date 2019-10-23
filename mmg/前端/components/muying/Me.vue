<template>
  <div class="index">
    <div class="content1">
      <!-- 顶部图片 start-->
      <div class="header">
        <a ><img @click="personal" class="himg" style="width:50px;height:50px;" src="../../img/default_photo.png" alt=""></a>
        <span class="hsp">74471802</span>
      </div>
      <!-- 顶部图片 end-->
      <!-- 内容 start -->
      <div>
        <p style="padding: 20px;border-bottom: 1px solid #eeeeee">个人中心</p>
        <ul class="Me_ul">
          <li @click="shdz"><div><img src="../../img/weizhi.png"><span class="me_span">地址</span></div></li>
          <li @click="order"><div><img src="../../img/single.png"><span class="me_span">我的订单</span></div></li>
          <li @click="gwc"><div><img src="../../img/gouwuche2.png"><span class="me_span">购物车</span></div></li>
          <li @click="xttz"><div><img src="../../img/tongzhi.png" alt=""><span class="me_span">系统通知</span></div></li>
          <li @click="yhq"><div><img src="../../img/youhuiquan.png" alt=""><span class="me_span">优惠券</span></div></li>
          <li @click="jf"><div><img src="../../img/jifen.png" alt=""><span class="me_span">积分</span></div></li>
        </ul>
      </div>
      <!-- 内容 end -->
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    order(){
      this.$router.push("/order")
    },
    personal(){
      this.$router.push("/personal")
    },
    jf(){
      this.$router.push("/jf")
    },
    yhq(){
      this.$router.push("/yhq")
    },
    xttz(){
      this.$router.push("/xttz")
    },
    shdz(){
      console.log('跳转')
      this.$router.push("/shdz")
    },
    gwc(){
      this.$router.push("/gwc")
    }
  },
}
</script>
<style scoped>
*{margin:0;padding:0;}
.index{width:100%;}
.content1{width:100%;}
.header{background-image: url("../../img/top_bg.jpg");width:100%;background-repeat: no-repeat;background-size: 100% 100%;position: relative;}
.himg{margin: 25px 25px;}
.hsp{position: absolute;top: 42px;left: 100px;color: #59607B;}
.Me_ul{padding:0}
li{vertical-align: top;text-align: center;display: inline-block; width: calc(100% / 4);line-height: 72px;height: 72px;}
li img{display: block; width: 25px;height:25px;margin:0 auto;}
li div{line-height: normal;vertical-align: middle;
display: inline-block;width: 100%;}
li .me_span{margin:0;}
a:link {font-size: 12px;color: #000000;text-decoration:none;} 
a:visited { font-size: 12px; color: #000000; text-decoration:none; } 
a:hover {font-size: 12px;color: #999999;text-decoration:underline; }
</style>