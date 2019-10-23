<template>
  <div>
    <!-- 面板,切换不同的页面 -->
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab">
        <sy></sy>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab1">
         <jx></jx>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <fl></fl>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
        <fl></fl>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab4">
          <me></me>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 底部导航条 start -->
    <mt-tabbar v-model="active">
      <!-- 首页 -->
      <mt-tab-item id="tab" @click.native="change(0)">
        <botabbaricon :focused="list[0].isSelect" :selectedImage="require('../../img/sySelec.png')"  :normalImage="require('../../img/syNorm.png')"></botabbaricon>首页
      </mt-tab-item> 
      <!-- 精选 -->
      <mt-tab-item id="tab1" @click.native="change(1)">
        <botabbaricon :focused="list[1].isSelect" :selectedImage="require('../../img/jxSelec.png')"  :normalImage="require('../../img/jxNorm.png')"></botabbaricon>精选
      </mt-tab-item>
      <!-- 分类 -->
      <mt-tab-item id="tab2" @click.native="change(2)">
        <botabbaricon :focused="list[2].isSelect" :selectedImage="require('../../img/flSelec.png')"  :normalImage="require('../../img/flNorm.png')"></botabbaricon>分类</mt-tab-item> 
      <!-- 购物车 -->
      <mt-tab-item id="tab3" @click.native="(toGwc(),change(3))">
        <botabbaricon  :focused="list[3].isSelect" :selectedImage="require('../../img/gwNorm.png')"  :normalImage="require('../../img/gwNorm.png')"></botabbaricon>购物车</mt-tab-item> 
      <!-- 我的 -->
      <mt-tab-item id="tab4" @click.native="(change(4),login123())">
        <botabbaricon :focused="list[4].isSelect" :selectedImage="require('../../img/meSelec.png')"  :normalImage="require('../../img/meNorm.png')"></botabbaricon>我的
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部导航条 end -->
  </div>
</template>
<script>
//引入底部图标组件
import BoTabbaricon from "./BoTabbaricon.vue"
//引入首页,精选,分类,购物车,我的这五个组件
import Sy from "./Sy.vue"
import Jx from "./Jx.vue"
import Fl from "./Fl.vue"
import Me from "./Me.vue"
export default {
  data(){
    return{
      active:"tab",
      list:[
        {isSelect:true},//首页
        {isSelect:false},//精选
        {isSelect:false},//分类
        {isSelect:false},//我的
        {isSelect:false}
      ]
    }
  },
  methods:{
     // 登录
    login123(){
      var uid=sessionStorage.uid;
      console.log(uid)
      if(uid==undefined){
        console.log(1)
        this.$messagebox("请登录")
        this.$router.push("/login");
      }
    },
    change(idx){
      for(var i=0;i<this.list.length;i++){
        if(i==idx){
          this.list[i].isSelect=true;
        }else{
          this.list[i].isSelect=false;
        }
      }
    },
    toGwc(){
      this.$router.push("/Gwc");
    }
  },
  components:{
  //注册底部图标组件
    "botabbaricon":BoTabbaricon,
    "sy":Sy,
    "jx":Jx,
    "fl":Fl,
    "me":Me
  }
}
</script>
<style scoped>
  /*默认状态*/
  .mint-tabbar>.mint-tab-item{
    color:#999999;
  }
  /*选中状态*/
  .mint-tabbar>.mint-tab-item.is-selected{
    color:pink;
  }
  .mint-tabbar{
    border-top:1px solid #000;
    position:fixed;
  }
  .mint-tab-container-item{
    margin-bottom:49px;
  }
</style>