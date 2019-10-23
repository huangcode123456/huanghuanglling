<template>
  <div>
    <!--<h1>分类</h1>-->
    <!--分类栏 五个按钮-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">未使用</mt-tab-item>
      <mt-tab-item id="3">已使用</mt-tab-item>
      <mt-tab-item id="4">已失效</mt-tab-item>
    </mt-navbar>
    <!--分类控制的面板-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <all></all>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <wsy></wsy>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ysx></ysx>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <ysy></ysy>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
// 引入一：全部内容
import all from './Me_yhq_all'
import wsy from './Me_yhq_wsy'
import ysx from './Me_yhq_ysx'
import ysy from './Me_yhq_ysy'
export default {
  data() {
    return {
      selected:"1",
    }
  },
  components:{
    "all":all,
    "wsy":wsy,
    "ysx":ysx,
    "ysy":ysy,
  },
  // created() {
  //   this.search();
  // },
  // methods:{
  //   search(){
  //     this.axios.get("order")
  //     .then(res=>{
  //       console.log(res.data.data);
  //     })
  //   }
  // }
}
</script>
<style scoped>
  
</style>