<template>
    <div>
        <div class="app">
            <div class="topImg">
                <img src="../../img/file_59c4b6e4b4191.png" alt="">
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
                        <syzhipin_moren></syzhipin_moren>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab1">
                        <syzhipin_xiaoliang></syzhipin_xiaoliang>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab2">
                        <syzhipin_jiage></syzhipin_jiage>
                    </mt-tab-container-item>
                    
                </mt-tab-container>
            </div>
        </div>    
    </div>
</template>
<script>
// 引入子组件
import Syzhipin_moren from "./Syzhipin_moren.vue"
import Syzhipin_xiaoliang from "./Syzhipin_xiaoliang.vue"
import Syzhipin_jiage from "./Syzhipin_jiage.vue"
export default {
      data(){
     return{
         selected:"tab",
         list:[]
        
        }
   },
      components:{
          "syzhipin_moren":Syzhipin_moren,
          "syzhipin_xiaoliang":Syzhipin_xiaoliang,
          "syzhipin_jiage":Syzhipin_jiage
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