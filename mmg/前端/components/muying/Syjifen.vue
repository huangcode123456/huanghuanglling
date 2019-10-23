<template>
    <div>
        <!-- 顶部导航 -->
        <mt-navbar v-model="selected">
            <mt-tab-item id="tab">全部</mt-tab-item>
            <mt-tab-item id="tab1">新品推荐</mt-tab-item>
            <mt-tab-item id="tab2">一元特卖</mt-tab-item>
            <mt-tab-item id="tab3">积分商品</mt-tab-item>
        </mt-navbar>
        <!-- 面板,切换不同的页面 -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="tab">
                <syquanbu></syquanbu>
             </mt-tab-container-item>

            <mt-tab-container-item id="tab1">
                 新品推荐
            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
               一元特卖
            </mt-tab-container-item>
            <mt-tab-container-item id="tab3">
                积分商品
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
// 引入子组件
import Syquanbu from "./Syquanbu.vue"
export default {
    data(){
     return{
         selected:"tab",
         list:[]
        
        }
   },
   created() {
       this.change();
   },
   methods: {
       change(){
           this.axios.get("product").then(res=>{
               console.log(res);
               this.list=res.data.data;
           })
       }
   },
   components:{
       "syquanbu":Syquanbu
   }
}

</script>
<style scoped>
.mint-navbar .mint-tab-item{
    color:#888;
    font-size:30px;
}
</style>
