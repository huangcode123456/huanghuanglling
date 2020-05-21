<template>
  <div class="jm-main-outer ">
    <!-- 二级菜单 -->
     <ul class="jm-menu">
      <li><router-link to="/traffic/intersection">路口监控</router-link></li>
      <li><router-link to="/traffic/vehicle">车辆监控</router-link></li>
      <li><router-link to="/traffic/billboard">诱导屏监测</router-link></li>
    </ul>
    <!-- 主体 -->
    <div class="jm-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "traffic",
  data() {
    return {
     
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    }
  },
  created() {
   
  },
  components: {}
};
</script>
<style scoped lang="less">

</style>

