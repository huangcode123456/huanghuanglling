<template>
    <div>
        <div class="app">
            <div class="topImg">
                <img src="../../img/cuxiaozc.png" alt="">
            </div>
            <div class="daohang">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="tab">默认</mt-tab-item>
                    <mt-tab-item id="tab1">销量</mt-tab-item>
                    <mt-tab-item id="tab2">价格</mt-tab-item>           
                </mt-navbar>
                <!-- 面板,切换不同的页面 -->
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="tab">
                        <sycuxiao_moren></sycuxiao_moren>    
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab1">
                        <sycuxiao_xiaoliang></sycuxiao_xiaoliang>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab2">
                        <sycuxiao_jiage></sycuxiao_jiage>
                    </mt-tab-container-item>
                    
                </mt-tab-container>
            </div>
        </div>    
    </div>
</template>
<script>
// 引入子组件
import Sycuxiao_moren from "./Sycuxiao_moren.vue"
import Sycuxiao_xiaoliang from "./Sycuxiao_xiaoliang.vue"
import Sycuxiao_jiage from "./Sycuxiao_jiage.vue"
export default {
      data(){
     return{
         selected:"tab",
         list:[]
        
        }
   },
      components:{
       "sycuxiao_moren":Sycuxiao_moren,
       "sycuxiao_xiaoliang":Sycuxiao_xiaoliang,
       "sycuxiao_jiage":Sycuxiao_jiage
   }
}
</script>
<style scoped>
  .app{width:86%;margin:0 auto;}
  .topImg{
      width:100%;
      height:100px;
      margin:0 auto;
      }
    .topImg img{width:100%;height: 100%;border-radius: inherit;}
</style>
