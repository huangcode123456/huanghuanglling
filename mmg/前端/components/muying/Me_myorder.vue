<template>
  <div>
    <!--<h1>分类</h1>-->
    <!--分类栏 五个按钮-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
      <mt-tab-item id="3">待发货</mt-tab-item>
      <mt-tab-item id="4">待收货</mt-tab-item>
      <mt-tab-item id="5">待评价</mt-tab-item>
    </mt-navbar>
    <!--分类控制的面板-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <all></all>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <dfk></dfk>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <dfh></dfh>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <dsh></dsh>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <dpj></dpj>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
// 引入一：全部内容
import All from './Me_mo_all'
import Dfk from './Me_mo_dfk'
import Dfh from './Me_mo_dfh'
import Dsh from './Me_mo_dsh'
import Dpj from './Me_mo_dpj'
export default {
  data() {
    return {
      selected:"1",
    }
  },
  components:{
    "all":All,
    "dfk":Dfk,
    "dfh":Dfh,
    "dsh":Dsh,
    "dpj":Dpj
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