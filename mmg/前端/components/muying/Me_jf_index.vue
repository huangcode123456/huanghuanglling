<template>
  <div class="">
    <!--积分，上框 start-->
    <div class="jf">
      <!--标题-->
      <div>
        <!--标题开头-->
        <div class="ptheader">积</div>
        <!--标题主体-->
        <span class="ptbody">现有积分/总积分</span>
      </div>
      <!--规则-->
      <div>
        <!--规则开头-->
        <div class="gzheader">?</div>
        <!--规则主体-->
        <span class="gzbody">积分规则</span>
      </div>
      <!--总量-->
      <div class="zl">
      <span>8</span>
      /
      <span>8</span>
      </div>
    </div>
    <!--积分，上框 end-->
    <!--收入/支出-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" >收入</mt-tab-item>
      <mt-tab-item id="2" >支出</mt-tab-item>
    </mt-navbar>
    <!-- 分类栏控制的面板 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <In></In>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <out></out>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import In from './Me_jf_in.vue'
import out from './Me_jf_out.vue'
export default {
  data() {
    return {
      selected:"1",
    }
  },
  components:{
    "In":In,
    "out":out
  }
}
</script>
<style scoped>
.jf{
  width:320px;
  height:125px;
  background:#5db968;
  margin:0 auto;
  position:relative;
}
.ptheader{
  width:20px;
  height:20px;
  background:#fff;
  color:#5db968;
  position:absolute;
  top:35px;
  left:30px;
  border-radius:50%;
  font-size:14px;
  text-align:center;
  line-height:20px;
}
.ptbody{
  color:#fff;
  position:absolute;
  top:36px;
  left:55px;
}
.gzheader{
  width:16px;
  height:16px;
  border-radius:50%;
  border:1px solid #fff;
  color:#fff;
  text-align:center;
  line-height:16px;
  position:absolute;
  top:36px;
  right:100px;
}
.gzbody{
  color:#fff;
  position:absolute;
  top:36px;
  right:32px;
}
.zl{
  color:#fff;
  font-size:24px;
  position:absolute;
  top:75px;
  left:35px;
}
</style>