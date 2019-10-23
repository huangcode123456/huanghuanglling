<template>
  <div>
    <div>
     <h4>
     <span>x</span>  
    育儿精选</h4>
    </div>
     <!-- 顶部导航条 start -->
    <mt-navbar v-model="active">
      <!-- 孕期话题 -->
      <mt-tab-item id="tab" >孕期话题</mt-tab-item> 
      <!-- 幼儿护理 -->
      <mt-tab-item id="tab1">幼儿护理</mt-tab-item>
      <!-- 准备怀孕 -->
      <mt-tab-item id="tab2">准备怀孕</mt-tab-item> 
      <!-- 可爱宝贝 -->
      <mt-tab-item id="tab3"> 可爱宝贝</mt-tab-item> 
      <!-- 妈妈厨房 -->
      <mt-tab-item id="tab4"> 妈妈厨房</mt-tab-item>
    </mt-navbar>
    <!-- 顶部导航条 end -->
    <!-- 面板,切换不同的页面 -->
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab">
        <htjx></htjx>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab1">
         <hljx></hljx>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <hyjx v-for="(list,i) of list3" :key="i" :list="list" :i="i"></hyjx>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
         <bbjx></bbjx>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab4">
          <cfjx></cfjx>
      </mt-tab-container-item>
    </mt-tab-container>   
  </div>
</template>
<script>
//引入顶部图标组件

//引入孕期话题，幼儿护理，准备怀孕，可爱宝宝，妈妈厨房这五个组件
import Htjx from "./Htjx.vue"
import Hljx from "./Hljx.vue"
import Hyjx from "./Hyjx.vue"
import Bbjx from "./Bbjx.vue"
import Cfjx from "./Cfjx.vue"
export default {
  data(){
    return{
      active:"tab",
      list3:[{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"}]
    }
  },
  created(){
    this.change();
  },
  methods:{
       change(){
          this.axios.get("msg").then(res=>{
            //console.log(res);
            this.list3=res.data.data.slice(13,18);
           
          })
       }
  },
  components:{
  //注册顶部图标组件
    "htjx":Htjx,
    "hljx":Hljx,
    "hyjx":Hyjx,
    "bbjx":Bbjx,
    "cfjx":Cfjx
  }
}

</script>
<style scoped>
  /*默认状态*/
  .mint-navbar>.mint-tab-item{
    color:#999999;
    font-size: 15px !important;
  }
  /*选中状态*/
  .app-container{
    margin-top:0%;
  }

h4{
  margin:0%;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #666 !important;
    margin-bottom: -3px;
    color:pink;
    
}


</style>