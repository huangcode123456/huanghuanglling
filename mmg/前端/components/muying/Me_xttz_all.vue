<template>
  <div>
    <!--<h1>分类</h1>-->
    <!--分类栏 五个按钮-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">系统消息</mt-tab-item>
      <mt-tab-item id="2">互动消息</mt-tab-item>
    </mt-navbar>
    <!--分类控制的面板-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <hd></hd>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <xt></xt>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
// 引入一：全部内容
import hd from './Me_xttz_hd'
import xt from './Me_xttz_xt'
export default {
  data() {
    return {
      selected:"1",
    }
  },
  components:{
    "hd":hd,
    "xt":xt,
  },
//   created() {
//     this.search();
//   },
//   methods:{
//     search(){
//       this.axios.get("order")
//       .then(res=>{
//         console.log(res.data.data);
//       })
//     }
//   }
 }
</script>
<style scoped>
  
</style>