<template>
  <div class="jm-main-inner">
    <!-- 三级菜单 -->
    <el-menu
      :default-active="$route.path"
      router
      class="jm-left-menu"
      >
      <el-menu-item index="/traffic/billboard/monitor">
        <span slot="title">诱导屏监测</span>
      </el-menu-item>
      <el-menu-item index="/traffic/billboard/information">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">信息发布管理</span>
      </el-menu-item>
      <el-menu-item index="/traffic/billboard/display">
        <span slot="title">显示页管理</span>
      </el-menu-item>
      <el-menu-item index="/traffic/billboard/task">
        <span slot="title">任务管理</span>
      </el-menu-item>
    </el-menu>
  
     

    <!-- 主体 -->
    <div class="jm-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "trafficBillboard",
  data() {
    return {
     
    };
  },
  methods: {
    
    
  },
  created() {
   
  },
  components: {}
};
</script>
<style scoped lang="less">

</style>

