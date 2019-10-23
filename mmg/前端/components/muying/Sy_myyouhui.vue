<template>
    <div>
           <!-- 顶部导航 -->
        <mt-navbar v-model="selected">
            <mt-tab-item id="tab">全部</mt-tab-item>
            <mt-tab-item id="tab1">未使用</mt-tab-item>
            <mt-tab-item id="tab2">已使用</mt-tab-item>
            <mt-tab-item id="tab3">已失效</mt-tab-item>
        </mt-navbar>
        <!-- 面板,切换不同的页面 -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="tab"></mt-tab-container-item>
            <mt-tab-container-item id="tab1"></mt-tab-container-item>  
            <mt-tab-container-item id="tab2"></mt-tab-container-item>
            <mt-tab-container-item id="tab3"></mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
export default {
    data(){
     return{
         selected:"tab",
         list:[]
        
        }
   },
}
</script>
